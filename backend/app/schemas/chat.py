from datetime import datetime

from pydantic import BaseModel, Field


class CoachMessageRequest(BaseModel):
  message: str = Field(min_length=2, max_length=2000)


class ChatMessageRead(BaseModel):
  id: int
  role: str
  content: str
  created_at: datetime

  model_config = {"from_attributes": True}


class CoachResponse(BaseModel):
  reply: ChatMessageRead
  history: list[ChatMessageRead]
