from sqlalchemy.orm import Session

from app.core.security import verify_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class AuthService:
  def __init__(self, db: Session):
    self.users = UserRepository(db)

  def register_user(self, payload: UserCreate) -> User | None:
    if self.users.get_by_email(payload.email):
      return None
    return self.users.create(payload)

  def authenticate_user(self, email: str, password: str) -> User | None:
    user = self.users.get_by_email(email)
    if not user or not verify_password(password, user.hashed_password):
      return None
    return user
