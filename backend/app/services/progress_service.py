from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.repositories.health_profile_repository import HealthProfileRepository
from app.repositories.progress_repository import ProgressRepository
from app.schemas.progress import ChartPoint, ProgressDashboard, ProgressEntryUpsert, WeeklyProgressDay


class ProgressService:
  def __init__(self, db: Session):
    self.progress = ProgressRepository(db)
    self.health_profiles = HealthProfileRepository(db)

  def upsert_current_user_entry(self, user_id: int, payload: ProgressEntryUpsert):
    return self.progress.upsert(user_id, payload)

  def dashboard(self, user_id: int) -> ProgressDashboard:
    entries = self.progress.list_recent(user_id, days=30)
    profile = self.health_profiles.get_by_user_id(user_id)
    latest_entry = entries[-1] if entries else None
    latest_weight = self._latest_weight(entries) or (profile.weight if profile else None)
    bmi = self._bmi(latest_weight, profile.height if profile else None)

    return ProgressDashboard(
      bmi=bmi,
      workout_streak=self._workout_streak(entries),
      weekly_progress=self._weekly_progress(entries),
      weight_trend=self._weight_trend(entries),
      latest_entry=latest_entry,
    )

  def _latest_weight(self, entries):
    for entry in reversed(entries):
      if entry.weight is not None:
        return entry.weight
    return None

  def _bmi(self, weight: float | None, height_cm: float | None) -> float | None:
    if not weight or not height_cm:
      return None
    height_m = height_cm / 100
    return round(weight / (height_m * height_m), 1)

  def _workout_streak(self, entries) -> int:
    by_date = {entry.entry_date: entry for entry in entries}
    streak = 0
    cursor = date.today()
    while by_date.get(cursor) and by_date[cursor].workout_completed:
      streak += 1
      cursor -= timedelta(days=1)
    return streak

  def _weekly_progress(self, entries) -> list[WeeklyProgressDay]:
    by_date = {entry.entry_date: entry for entry in entries}
    start = date.today() - timedelta(days=6)
    days = []
    for index in range(7):
      current = start + timedelta(days=index)
      entry = by_date.get(current)
      days.append(
        WeeklyProgressDay(
          label=current.strftime("%a"),
          water_intake=entry.water_intake if entry and entry.water_intake is not None else 0,
          workout_completed=1 if entry and entry.workout_completed else 0,
        )
      )
    return days

  def _weight_trend(self, entries) -> list[ChartPoint]:
    return [
      ChartPoint(label=entry.entry_date.strftime("%b %d"), value=entry.weight)
      for entry in entries
      if entry.weight is not None
    ]
