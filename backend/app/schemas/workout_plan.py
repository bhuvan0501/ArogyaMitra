from datetime import datetime

from pydantic import BaseModel, Field, field_validator


DAY_NAMES = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7,
}


class Exercise(BaseModel):
  name: str = Field(min_length=2, max_length=120)
  sets: int | str
  reps: int | str
  duration: str = Field(default="", max_length=80)
  difficulty: str = Field(default="Beginner", max_length=50)
  calories: int | str = ""
  muscle_group: str = Field(default="Full Body", max_length=80)
  instructions: str = Field(min_length=5, max_length=500)

  @field_validator("sets", "reps", "calories")
  @classmethod
  def validate_number_or_short_text(cls, value):
    if isinstance(value, int):
      if value >= 0:
        return value
      raise ValueError("numeric exercise values must be non-negative")

    if isinstance(value, str) and 1 <= len(value.strip()) <= 80:
      return value.strip()
    raise ValueError("exercise values must be a non-negative number or short text")


class WorkoutDay(BaseModel):
  day: int | str
  total_calories: int | None = Field(default=None, ge=0, le=5000)
  focus: str = Field(min_length=2, max_length=120)
  warm_up: str = Field(min_length=5, max_length=500)
  exercises: list[Exercise] = Field(min_length=1, max_length=10)
  rest_time: str = Field(min_length=2, max_length=120)
  cool_down: str = Field(min_length=5, max_length=500)
  daily_tip: str = Field(min_length=5, max_length=500)
  youtube_search_query: str = Field(min_length=5, max_length=200)

  @field_validator("day")
  @classmethod
  def validate_day(cls, value):
    if isinstance(value, int):
      if 1 <= value <= 7:
        return value
      raise ValueError("day must be between 1 and 7")

    normalized = value.strip().lower()
    if normalized in DAY_NAMES:
      return value.strip().title()
    raise ValueError("day must be a weekday name or number from 1 to 7")


class WorkoutPlanContent(BaseModel):
  title: str = Field(min_length=2, max_length=255)
  days: list[WorkoutDay] = Field(min_length=7, max_length=7)


class WorkoutPlanRead(BaseModel):
  id: int
  user_id: int
  title: str
  plan: WorkoutPlanContent
  created_at: datetime

  model_config = {"from_attributes": True}
