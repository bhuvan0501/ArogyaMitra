from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class HealthProfile(Base):
  __tablename__ = "health_profiles"

  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
  name: Mapped[str] = mapped_column(String(255))
  age: Mapped[int] = mapped_column(Integer)
  gender: Mapped[str] = mapped_column(String(50))
  height: Mapped[float] = mapped_column()
  weight: Mapped[float] = mapped_column()
  goal: Mapped[str] = mapped_column(String(100))
  activity_level: Mapped[str] = mapped_column(String(100))
  workout_preference: Mapped[str] = mapped_column(String(100))
  time_available: Mapped[int] = mapped_column(Integer)
  dietary_preference: Mapped[str] = mapped_column(String(100))
  allergies: Mapped[str | None] = mapped_column(Text, nullable=True)
  medical_conditions: Mapped[str | None] = mapped_column(Text, nullable=True)

  user = relationship("User", back_populates="health_profile")
