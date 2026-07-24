from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app
from app.services.chat_service import ChatService


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"chat-{uuid4().hex}@example.com"
  password = "securepass123"

  client.post("/api/v1/auth/register", json={"email": email, "password": password, "full_name": "Chat Member"})
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  return {"Authorization": f"Bearer {response.json()['access_token']}"}


def create_profile(headers: dict[str, str]) -> None:
  client.post(
    "/api/v1/health-profile/me",
    json={
      "name": "Chat Member",
      "age": 30,
      "gender": "Female",
      "height": 165,
      "weight": 62,
      "goal": "General fitness",
      "activity_level": "Moderately active",
      "workout_preference": "Home",
      "time_available": 30,
      "dietary_preference": "Vegetarian",
      "allergies": None,
      "medical_conditions": None,
    },
    headers=headers,
  )


def test_aromi_chat_persists_history(monkeypatch):
  headers = auth_headers()
  create_profile(headers)

  def fake_reply(self, user_id: int, message: str):
    self.messages.create(user_id, "user", message)
    reply = self.messages.create(user_id, "assistant", "## AROMI\n\nTry a shorter low-impact session today.")
    return reply, self.messages.list_by_user_id(user_id)

  monkeypatch.setattr(ChatService, "create_reply", fake_reply)

  response = client.post("/api/v1/ai/coach", json={"message": "I only have 20 minutes"}, headers=headers)

  assert response.status_code == 200
  assert response.json()["reply"]["role"] == "assistant"
  assert "AROMI" in response.json()["reply"]["content"]
  assert len(response.json()["history"]) == 2

  history_response = client.get("/api/v1/ai/coach/history", headers=headers)

  assert history_response.status_code == 200
  assert len(history_response.json()) == 2
