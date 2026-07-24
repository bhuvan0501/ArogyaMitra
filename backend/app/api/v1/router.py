from fastapi import APIRouter

from app.api.v1.endpoints import ai, auth, external, fitness, health, health_profile, users

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(fitness.router, prefix="/fitness", tags=["fitness"])
api_router.include_router(health_profile.router, prefix="/health-profile", tags=["health-profile"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(external.router, prefix="/external", tags=["external"])
