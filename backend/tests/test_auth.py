from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_register_login_and_current_user():
  email = f"member-{uuid4().hex}@example.com"

  register_response = client.post(
    "/api/v1/auth/register",
    json={"email": email, "password": "securepass123", "full_name": "Arogya Member"},
  )

  assert register_response.status_code == 201
  assert register_response.json()["email"] == email
  assert "hashed_password" not in register_response.json()

  login_response = client.post(
    "/api/v1/auth/login",
    json={"email": email, "password": "securepass123"},
  )

  assert login_response.status_code == 200
  token = login_response.json()["access_token"]

  me_response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})

  assert me_response.status_code == 200
  assert me_response.json()["email"] == email


def test_protected_route_requires_token():
  response = client.get("/api/v1/fitness/dashboard")

  assert response.status_code == 401
