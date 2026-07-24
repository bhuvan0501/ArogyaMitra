from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app
from app.schemas.nutrition_plan import NutritionPlanContent
from app.schemas.plan_adaptation import PlanAdaptationContent
from app.schemas.workout_plan import WorkoutPlanContent
from app.services.plan_adaptation_service import PlanAdaptationService


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"adapt-{uuid4().hex}@example.com"
  password = "securepass123"
  client.post("/api/v1/auth/register", json={"email": email, "password": password, "full_name": "Adapt Member"})
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  return {"Authorization": f"Bearer {response.json()['access_token']}"}


def create_profile(headers: dict[str, str]) -> None:
  client.post(
    "/api/v1/health-profile/me",
    json={
      "name": "Adapt Member",
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


def workout_content() -> WorkoutPlanContent:
  return WorkoutPlanContent.model_validate(
    {
      "title": "Adapted Workout",
      "days": [
        {
          "day": day,
          "focus": "Low impact" if day == 1 else f"Focus {day}",
          "warm_up": "Gentle mobility warm-up",
          "exercises": [
            {
              "name": "Wall push-up",
              "sets": "2",
              "reps": "10",
              "instructions": "Move slowly and stop if pain increases.",
            }
          ],
          "rest_time": "75 seconds",
          "cool_down": "Gentle stretching",
          "daily_tip": "Keep intensity easy today.",
          "youtube_search_query": "low impact home workout",
        }
        for day in range(1, 8)
      ],
    }
  )


def meal(name: str) -> dict:
  return {
    "name": name,
    "description": f"{name} meal",
    "calories": 400,
    "protein": 20,
    "carbs": 50,
    "fat": 10,
    "recipe_search_query": name.lower(),
  }


def nutrition_content() -> NutritionPlanContent:
  return NutritionPlanContent.model_validate(
    {
      "title": "Adapted Nutrition",
      "days": [
        {
          "day": day,
          "breakfast": meal("Oats"),
          "lunch": meal("Rice bowl"),
          "snacks": meal("Yogurt"),
          "dinner": meal("Lentils"),
          "total_calories": 1600,
          "total_protein": 80,
          "total_carbs": 200,
          "total_fat": 40,
          "daily_tip": "Hydrate and keep meals simple.",
        }
        for day in range(1, 8)
      ],
    }
  )


def test_agentic_plan_adaptation_stores_updated_versions(monkeypatch):
  headers = auth_headers()
  create_profile(headers)

  def fake_adapt(self, user_id, payload):
    adaptation = PlanAdaptationContent.model_validate(
      {
        "explanation": {
          "summary": "Adjusted only low-energy workout intensity and simple meals.",
          "workout_changes": ["Day 1 changed to low impact"],
          "nutrition_changes": ["Meals kept simple"],
          "unchanged": ["Unaffected days retained"],
        },
        "workout_plan": workout_content().model_dump(),
        "nutrition_plan": nutrition_content().model_dump(),
      }
    )
    return (
      adaptation.explanation,
      self.workout_plans.create(user_id, adaptation.workout_plan),
      self.nutrition_plans.create(user_id, adaptation.nutrition_plan),
    )

  monkeypatch.setattr(PlanAdaptationService, "adapt_current_user_plans", fake_adapt)

  response = client.post("/api/v1/fitness/plans/adapt", json={"mood": "Low energy"}, headers=headers)

  assert response.status_code == 201
  assert response.json()["explanation"]["workout_changes"] == ["Day 1 changed to low impact"]
  assert response.json()["workout_plan"]["plan"]["days"][0]["focus"] == "Low impact"
