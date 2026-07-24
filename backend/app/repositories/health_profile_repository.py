from sqlalchemy.orm import Session

from app.models.health_profile import HealthProfile
from app.schemas.health_profile import HealthProfileCreate, HealthProfileUpdate


class HealthProfileRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_by_user_id(self, user_id: int) -> HealthProfile | None:
    return self.db.query(HealthProfile).filter(HealthProfile.user_id == user_id).first()

  def create(self, user_id: int, payload: HealthProfileCreate) -> HealthProfile:
    profile = HealthProfile(user_id=user_id, **payload.model_dump())
    self.db.add(profile)
    self.db.commit()
    self.db.refresh(profile)
    return profile

  def update(self, profile: HealthProfile, payload: HealthProfileUpdate) -> HealthProfile:
    for field, value in payload.model_dump().items():
      setattr(profile, field, value)
    self.db.commit()
    self.db.refresh(profile)
    return profile

  def delete(self, profile: HealthProfile) -> None:
    self.db.delete(profile)
    self.db.commit()
