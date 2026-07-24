from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app
from app.schemas.workout_plan import WorkoutPlanContent
from app.services.workout_plan_service import WorkoutPlanService


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"workout-{uuid4().hex}@example.com"
  password = "securepass123"

  client.post("/api/v1/auth/register", json={"email": email, "password": password, "full_name": "Workout Member"})
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  return {"Authorization": f"Bearer {response.json()['access_token']}"}


def create_profile(headers: dict[str, str]) -> None:
  client.post(
    "/api/v1/health-profile/me",
    json={
      "name": "Workout Member",
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


def fake_plan_content() -> WorkoutPlanContent:
  days = []
  for day in range(1, 8):
    days.append(
      {
        "day": day,
        "focus": f"Focus {day}",
        "warm_up": "Five minutes of light mobility",
        "exercises": [
          {
            "name": "Bodyweight squat",
            "sets": "3",
            "reps": "12",
            "instructions": "Move with control and keep the chest lifted.",
          }
        ],
        "rest_time": "60 seconds",
        "cool_down": "Gentle stretching for five minutes",
        "daily_tip": "Keep the effort moderate and listen to your body.",
        "youtube_search_query": "beginner home workout form",
      }
    )
  return WorkoutPlanContent(title="Mock 7 Day Plan", days=days)


def test_generate_workout_plan_stores_structured_json(monkeypatch):
  headers = auth_headers()
  create_profile(headers)

  monkeypatch.setattr(WorkoutPlanService, "generate_for_current_user", lambda self, user_id: self.workout_plans.create(user_id, fake_plan_content()))

  response = client.post("/api/v1/fitness/workout-plans/generate", headers=headers)

  assert response.status_code == 201
  assert response.json()["plan"]["title"] == "Mock 7 Day Plan"
  assert len(response.json()["plan"]["days"]) == 7

  list_response = client.get("/api/v1/fitness/workout-plans", headers=headers)

  assert list_response.status_code == 200
  assert list_response.json()[0]["plan"]["days"][0]["youtube_search_query"] == "beginner home workout form"
