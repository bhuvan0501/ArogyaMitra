from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app
from app.schemas.nutrition_plan import NutritionPlanContent
from app.services.nutrition_plan_service import NutritionPlanService


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"nutrition-{uuid4().hex}@example.com"
  password = "securepass123"

  client.post("/api/v1/auth/register", json={"email": email, "password": password, "full_name": "Nutrition Member"})
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  return {"Authorization": f"Bearer {response.json()['access_token']}"}


def create_profile(headers: dict[str, str]) -> None:
  client.post(
    "/api/v1/health-profile/me",
    json={
      "name": "Nutrition Member",
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


def fake_meal(name: str) -> dict:
  return {
    "name": name,
    "description": f"{name} with balanced whole foods.",
    "calories": 450,
    "protein": 25,
    "carbs": 55,
    "fat": 12,
    "recipe_search_query": name.lower(),
  }


def fake_plan_content() -> NutritionPlanContent:
  days = []
  for day in range(1, 8):
    days.append(
      {
        "day": day,
        "breakfast": fake_meal("Oats and fruit"),
        "lunch": fake_meal("Paneer quinoa bowl"),
        "snacks": fake_meal("Greek yogurt snack"),
        "dinner": fake_meal("Lentil vegetable curry"),
        "total_calories": 1800,
        "total_protein": 100,
        "total_carbs": 220,
        "total_fat": 55,
        "daily_tip": "Keep meals colorful and hydrate consistently.",
      }
    )
  return NutritionPlanContent(title="Mock Nutrition Plan", days=days)


def test_generate_nutrition_plan_stores_structured_json(monkeypatch):
  headers = auth_headers()
  create_profile(headers)

  monkeypatch.setattr(NutritionPlanService, "generate_for_current_user", lambda self, user_id: self.nutrition_plans.create(user_id, fake_plan_content()))

  response = client.post("/api/v1/fitness/nutrition-plans/generate", headers=headers)

  assert response.status_code == 201
  assert response.json()["plan"]["title"] == "Mock Nutrition Plan"
  assert len(response.json()["plan"]["days"]) == 7

  list_response = client.get("/api/v1/fitness/nutrition-plans", headers=headers)

  assert list_response.status_code == 200
  assert list_response.json()[0]["plan"]["days"][0]["breakfast"]["recipe_search_query"] == "oats and fruit"
