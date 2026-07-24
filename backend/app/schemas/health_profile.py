from pydantic import BaseModel, Field


class HealthProfileBase(BaseModel):
  name: str = Field(min_length=2, max_length=255)
  age: int = Field(ge=13, le=120)
  gender: str = Field(min_length=2, max_length=50)
  height: float = Field(gt=0, le=300, description="Height in centimeters")
  weight: float = Field(gt=0, le=500, description="Weight in kilograms")
  goal: str = Field(min_length=2, max_length=100)
  activity_level: str = Field(min_length=2, max_length=100)
  workout_preference: str = Field(min_length=2, max_length=100)
  time_available: int = Field(ge=5, le=300, description="Minutes available per day")
  dietary_preference: str = Field(min_length=2, max_length=100)
  allergies: str | None = Field(default=None, max_length=1000)
  medical_conditions: str | None = Field(default=None, max_length=1000)


class HealthProfileCreate(HealthProfileBase):
  pass


class HealthProfileUpdate(HealthProfileBase):
  pass


class HealthProfileRead(HealthProfileBase):
  id: int
  user_id: int

  model_config = {"from_attributes": True}
