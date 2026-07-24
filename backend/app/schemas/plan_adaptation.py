from pydantic import BaseModel, Field, model_validator

from app.schemas.nutrition_plan import NutritionPlanContent, NutritionPlanRead
from app.schemas.workout_plan import WorkoutPlanContent, WorkoutPlanRead


class PlanAdaptationRequest(BaseModel):
  mood: str | None = Field(default=None, min_length=2, max_length=120)
  injury: str | None = Field(default=None, min_length=2, max_length=300)
  travel: str | None = Field(default=None, min_length=2, max_length=300)
  time_available: int | None = Field(default=None, ge=5, le=300)

  @model_validator(mode="after")
  def require_one_change(self):
    if not any([self.mood, self.injury, self.travel, self.time_available is not None]):
      raise ValueError("At least one adaptive input is required")
    return self


class PlanChangeExplanation(BaseModel):
  summary: str = Field(min_length=5, max_length=1000)
  workout_changes: list[str] = Field(default_factory=list, max_length=20)
  nutrition_changes: list[str] = Field(default_factory=list, max_length=20)
  unchanged: list[str] = Field(default_factory=list, max_length=20)


class PlanAdaptationContent(BaseModel):
  explanation: PlanChangeExplanation
  workout_plan: WorkoutPlanContent
  nutrition_plan: NutritionPlanContent


class PlanAdaptationResponse(BaseModel):
  explanation: PlanChangeExplanation
  workout_plan: WorkoutPlanRead
  nutrition_plan: NutritionPlanRead
