from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.nutrition_plan import NutritionPlanRead
from app.schemas.plan_adaptation import PlanAdaptationRequest, PlanAdaptationResponse
from app.schemas.progress import ProgressDashboard, ProgressEntryRead, ProgressEntryUpsert
from app.schemas.workout_plan import WorkoutPlanRead
from app.services.nutrition_plan_service import NutritionPlanService
from app.services.plan_adaptation_service import PlanAdaptationService
from app.services.progress_service import ProgressService
from app.services.workout_plan_service import WorkoutPlanService

router = APIRouter()


@router.get("/dashboard", response_model=ProgressDashboard)
def get_dashboard(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return ProgressService(db).dashboard(current_user.id)


@router.post("/progress", response_model=ProgressEntryRead)
def upsert_progress(
  payload: ProgressEntryUpsert,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return ProgressService(db).upsert_current_user_entry(current_user.id, payload)


@router.get("/workouts")
def get_workouts(current_user: User = Depends(get_current_active_user)):
  return {"detail": "Use /fitness/workout-plans for generated workout plans"}


@router.get("/workout-plans", response_model=list[WorkoutPlanRead])
def list_workout_plans(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return WorkoutPlanService(db).list_current_user_plans(current_user.id)


@router.post("/workout-plans/generate", response_model=WorkoutPlanRead, status_code=status.HTTP_201_CREATED)
def generate_workout_plan(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return WorkoutPlanService(db).generate_for_current_user(current_user.id)


@router.get("/nutrition")
def get_nutrition(current_user: User = Depends(get_current_active_user)):
  return {"detail": "Use /fitness/nutrition-plans for generated nutrition plans"}


@router.get("/nutrition-plans", response_model=list[NutritionPlanRead])
def list_nutrition_plans(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return NutritionPlanService(db).list_current_user_plans(current_user.id)


@router.post("/nutrition-plans/generate", response_model=NutritionPlanRead, status_code=status.HTTP_201_CREATED)
def generate_nutrition_plan(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return NutritionPlanService(db).generate_for_current_user(current_user.id)


@router.post("/plans/adapt", response_model=PlanAdaptationResponse, status_code=status.HTTP_201_CREATED)
def adapt_plans(
  payload: PlanAdaptationRequest,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  explanation, workout_plan, nutrition_plan = PlanAdaptationService(db).adapt_current_user_plans(current_user.id, payload)
  return PlanAdaptationResponse(
    explanation=explanation,
    workout_plan=workout_plan,
    nutrition_plan=nutrition_plan,
  )
