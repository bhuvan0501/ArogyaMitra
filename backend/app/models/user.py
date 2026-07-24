from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class User(Base):
  __tablename__ = "users"

  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
  hashed_password: Mapped[str] = mapped_column(String(255))
  full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
  is_active: Mapped[bool] = mapped_column(Boolean, default=True)
  health_profile = relationship("HealthProfile", back_populates="user", uselist=False)
  workout_plans = relationship("WorkoutPlan", back_populates="user")
  nutrition_plans = relationship("NutritionPlan", back_populates="user")
  chat_messages = relationship("ChatMessage", back_populates="user")
  progress_entries = relationship("ProgressEntry", back_populates="user")
