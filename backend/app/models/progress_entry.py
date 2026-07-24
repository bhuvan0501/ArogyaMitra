from datetime import date, datetime, timezone

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class ProgressEntry(Base):
  __tablename__ = "progress_entries"
  __table_args__ = (UniqueConstraint("user_id", "entry_date", name="uq_progress_user_date"),)

  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
  entry_date: Mapped[date] = mapped_column(Date, index=True)
  weight: Mapped[float | None] = mapped_column(Float, nullable=True)
  water_intake: Mapped[float | None] = mapped_column(Float, nullable=True)
  workout_completed: Mapped[bool] = mapped_column(Boolean, default=False)
  notes: Mapped[str | None] = mapped_column(Text, nullable=True)
  updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

  user = relationship("User", back_populates="progress_entries")
