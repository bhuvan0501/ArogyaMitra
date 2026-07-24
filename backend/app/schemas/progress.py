from datetime import date, datetime

from pydantic import BaseModel, Field


class ProgressEntryUpsert(BaseModel):
  entry_date: date | None = None
  weight: float | None = Field(default=None, gt=0, le=500)
  water_intake: float | None = Field(default=None, ge=0, le=20)
  workout_completed: bool = False
  notes: str | None = Field(default=None, max_length=1000)


class ProgressEntryRead(BaseModel):
  id: int
  user_id: int
  entry_date: date
  weight: float | None
  water_intake: float | None
  workout_completed: bool
  notes: str | None
  updated_at: datetime

  model_config = {"from_attributes": True}


class ChartPoint(BaseModel):
  label: str
  value: float


class WeeklyProgressDay(BaseModel):
  label: str
  water_intake: float
  workout_completed: int


class ProgressDashboard(BaseModel):
  bmi: float | None
  workout_streak: int
  weekly_progress: list[WeeklyProgressDay]
  weight_trend: list[ChartPoint]
  latest_entry: ProgressEntryRead | None
