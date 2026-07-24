from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.progress_entry import ProgressEntry
from app.schemas.progress import ProgressEntryUpsert


class ProgressRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_by_date(self, user_id: int, entry_date: date) -> ProgressEntry | None:
    return (
      self.db.query(ProgressEntry)
      .filter(ProgressEntry.user_id == user_id, ProgressEntry.entry_date == entry_date)
      .first()
    )

  def list_recent(self, user_id: int, days: int = 30) -> list[ProgressEntry]:
    start = date.today() - timedelta(days=days - 1)
    return (
      self.db.query(ProgressEntry)
      .filter(ProgressEntry.user_id == user_id, ProgressEntry.entry_date >= start)
      .order_by(ProgressEntry.entry_date.asc())
      .all()
    )

  def upsert(self, user_id: int, payload: ProgressEntryUpsert) -> ProgressEntry:
    entry_date = payload.entry_date or date.today()
    entry = self.get_by_date(user_id, entry_date)
    if entry is None:
      entry = ProgressEntry(user_id=user_id, entry_date=entry_date)
      self.db.add(entry)

    data = payload.model_dump(exclude={"entry_date"})
    for field, value in data.items():
      setattr(entry, field, value)

    self.db.commit()
    self.db.refresh(entry)
    return entry
