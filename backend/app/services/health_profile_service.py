from sqlalchemy.orm import Session

from app.models.health_profile import HealthProfile
from app.repositories.health_profile_repository import HealthProfileRepository
from app.schemas.health_profile import HealthProfileCreate, HealthProfileUpdate


class HealthProfileService:
  def __init__(self, db: Session):
    self.profiles = HealthProfileRepository(db)

  def get_current_profile(self, user_id: int) -> HealthProfile | None:
    return self.profiles.get_by_user_id(user_id)

  def create_current_profile(self, user_id: int, payload: HealthProfileCreate) -> HealthProfile | None:
    if self.profiles.get_by_user_id(user_id):
      return None
    return self.profiles.create(user_id, payload)

  def update_current_profile(self, user_id: int, payload: HealthProfileUpdate) -> HealthProfile | None:
    profile = self.profiles.get_by_user_id(user_id)
    if profile is None:
      return None
    return self.profiles.update(profile, payload)

  def delete_current_profile(self, user_id: int) -> bool:
    profile = self.profiles.get_by_user_id(user_id)
    if profile is None:
      return False
    self.profiles.delete(profile)
    return True
