from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.health_profile_repository import HealthProfileRepository
from app.repositories.nutrition_plan_repository import NutritionPlanRepository
from app.services.ai_service import AiService


class NutritionPlanService:
  def __init__(self, db: Session):
    self.health_profiles = HealthProfileRepository(db)
    self.nutrition_plans = NutritionPlanRepository(db)
    self.ai = AiService()

  def list_current_user_plans(self, user_id: int):
    return self.nutrition_plans.list_by_user_id(user_id)

  def generate_for_current_user(self, user_id: int):
    profile = self.health_profiles.get_by_user_id(user_id)
    if profile is None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Create a health profile before generating a nutrition plan",
      )

    content = self.ai.generate_nutrition_plan(profile)
    return self.nutrition_plans.create(user_id, content)
