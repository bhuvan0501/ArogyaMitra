from datetime import datetime

from pydantic import BaseModel, Field


class Meal(BaseModel):
  name: str = Field(min_length=2, max_length=160)
  description: str = Field(min_length=5, max_length=600)
  calories: int = Field(ge=0, le=3000)
  protein: float = Field(ge=0, le=300)
  carbs: float = Field(ge=0, le=500)
  fat: float = Field(ge=0, le=300)
  recipe_search_query: str = Field(min_length=5, max_length=200)


class NutritionDay(BaseModel):
  day: int = Field(ge=1, le=7)
  breakfast: Meal
  lunch: Meal
  snacks: Meal
  dinner: Meal
  total_calories: int = Field(ge=0, le=10000)
  total_protein: float = Field(ge=0, le=500)
  total_carbs: float = Field(ge=0, le=1000)
  total_fat: float = Field(ge=0, le=500)
  daily_tip: str = Field(min_length=5, max_length=500)


class NutritionPlanContent(BaseModel):
  title: str = Field(min_length=2, max_length=255)
  days: list[NutritionDay] = Field(min_length=7, max_length=7)


class NutritionPlanRead(BaseModel):
  id: int
  user_id: int
  title: str
  plan: NutritionPlanContent
  created_at: datetime

  model_config = {"from_attributes": True}
