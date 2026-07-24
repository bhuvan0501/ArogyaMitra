from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.health_profile_repository import HealthProfileRepository
from app.repositories.nutrition_plan_repository import NutritionPlanRepository
from app.repositories.workout_plan_repository import WorkoutPlanRepository
from app.schemas.plan_adaptation import PlanAdaptationRequest
from app.services.ai_service import AiService


class PlanAdaptationService:
  def __init__(self, db: Session):
    self.health_profiles = HealthProfileRepository(db)
    self.workout_plans = WorkoutPlanRepository(db)
    self.nutrition_plans = NutritionPlanRepository(db)
    self.ai = AiService()

  def adapt_current_user_plans(self, user_id: int, payload: PlanAdaptationRequest):
    profile = self.health_profiles.get_by_user_id(user_id)
    if profile is None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Create a health profile before adapting plans",
      )

    latest_workout = self.workout_plans.get_latest_by_user_id(user_id)
    latest_nutrition = self.nutrition_plans.get_latest_by_user_id(user_id)
    if latest_workout is None or latest_nutrition is None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Generate workout and nutrition plans before adapting them",
      )

    adaptation = self.ai.adapt_plans(
      profile=profile,
      changes=payload,
      workout_plan=latest_workout.plan,
      nutrition_plan=latest_nutrition.plan,
    )
    updated_workout = self.workout_plans.create(user_id, adaptation.workout_plan)
    updated_nutrition = self.nutrition_plans.create(user_id, adaptation.nutrition_plan)

    return adaptation.explanation, updated_workout, updated_nutrition
