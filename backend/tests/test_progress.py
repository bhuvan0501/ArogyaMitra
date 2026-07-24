from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"progress-{uuid4().hex}@example.com"
  password = "securepass123"
  client.post("/api/v1/auth/register", json={"email": email, "password": password, "full_name": "Progress Member"})
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  return {"Authorization": f"Bearer {response.json()['access_token']}"}


def create_profile(headers: dict[str, str]) -> None:
  client.post(
    "/api/v1/health-profile/me",
    json={
      "name": "Progress Member",
      "age": 30,
      "gender": "Female",
      "height": 165,
      "weight": 62,
      "goal": "General fitness",
      "activity_level": "Moderately active",
      "workout_preference": "Home",
      "time_available": 40,
      "dietary_preference": "Vegetarian",
      "allergies": None,
      "medical_conditions": None,
    },
    headers=headers,
  )


def test_progress_update_and_dashboard_stats():
  headers = auth_headers()
  create_profile(headers)

  response = client.post(
    "/api/v1/fitness/progress",
    json={"weight": 64, "water_intake": 2.5, "workout_completed": True, "notes": "Felt strong."},
    headers=headers,
  )

  assert response.status_code == 200
  assert response.json()["water_intake"] == 2.5

  dashboard = client.get("/api/v1/fitness/dashboard", headers=headers)

  assert dashboard.status_code == 200
  assert dashboard.json()["bmi"] == 23.5
  assert dashboard.json()["workout_streak"] == 1
  assert dashboard.json()["latest_entry"]["notes"] == "Felt strong."
