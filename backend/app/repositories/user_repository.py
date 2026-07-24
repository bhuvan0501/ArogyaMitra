from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.models.user import User
from app.schemas.user import UserCreate


class UserRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_by_email(self, email: str) -> User | None:
    return self.db.query(User).filter(User.email == email.lower()).first()

  def get_by_id(self, user_id: int) -> User | None:
    return self.db.get(User, user_id)

  def create(self, payload: UserCreate) -> User:
    user = User(
      email=payload.email.lower(),
      full_name=payload.full_name,
      hashed_password=get_password_hash(payload.password),
    )
    self.db.add(user)
    self.db.commit()
    self.db.refresh(user)
    return user
