from sqlalchemy.orm import Session

from app.models.chat_message import ChatMessage


class ChatRepository:
  def __init__(self, db: Session):
    self.db = db

  def list_by_user_id(self, user_id: int, limit: int = 30) -> list[ChatMessage]:
    messages = (
      self.db.query(ChatMessage)
      .filter(ChatMessage.user_id == user_id)
      .order_by(ChatMessage.created_at.desc())
      .limit(limit)
      .all()
    )
    return list(reversed(messages))

  def create(self, user_id: int, role: str, content: str) -> ChatMessage:
    message = ChatMessage(user_id=user_id, role=role, content=content)
    self.db.add(message)
    self.db.commit()
    self.db.refresh(message)
    return message

  def delete_by_user_id(self, user_id: int) -> None:
    self.db.query(ChatMessage).filter(ChatMessage.user_id == user_id).delete()
    self.db.commit()
