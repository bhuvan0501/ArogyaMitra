from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def auth_headers() -> dict[str, str]:
  email = f"profile-{uuid4().hex}@example.com"
  password = "securepass123"

  client.post(
    "/api/v1/auth/register",
    json={"email": email, "password": password, "full_name": "Profile Member"},
  )
  response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
  token = response.json()["access_token"]
  return {"Authorization": f"Bearer {token}"}


def valid_profile_payload() -> dict:
  return {
    "name": "Profile Member",
    "age": 32,
    "gender": "Female",
    "height": 165.5,
    "weight": 62.0,
    "goal": "General fitness",
    "activity_level": "Moderately active",
    "workout_preference": "Mixed",
    "time_available": 45,
    "dietary_preference": "Vegetarian",
    "allergies": "Peanuts",
    "medical_conditions": "None",
  }


def test_health_profile_crud_for_current_user():
  headers = auth_headers()

  create_response = client.post("/api/v1/health-profile/me", json=valid_profile_payload(), headers=headers)

  assert create_response.status_code == 201
  assert create_response.json()["goal"] == "General fitness"

  read_response = client.get("/api/v1/health-profile/me", headers=headers)

  assert read_response.status_code == 200
  assert read_response.json()["name"] == "Profile Member"

  update_payload = valid_profile_payload()
  update_payload["goal"] = "Muscle gain"
  update_response = client.put("/api/v1/health-profile/me", json=update_payload, headers=headers)

  assert update_response.status_code == 200
  assert update_response.json()["goal"] == "Muscle gain"

  delete_response = client.delete("/api/v1/health-profile/me", headers=headers)

  assert delete_response.status_code == 204


def test_health_profile_validates_inputs():
  headers = auth_headers()
  payload = valid_profile_payload()
  payload["age"] = 5

  response = client.post("/api/v1/health-profile/me", json=payload, headers=headers)

  assert response.status_code == 422
