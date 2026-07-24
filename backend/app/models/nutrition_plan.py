from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class NutritionPlan(Base):
  __tablename__ = "nutrition_plans"

  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
  title: Mapped[str] = mapped_column(String(255))
  plan: Mapped[dict] = mapped_column(JSON)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

  user = relationship("User", back_populates="nutrition_plans")
