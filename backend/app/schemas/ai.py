from pydantic import BaseModel


class CoachRequest(BaseModel):
  message: str


class CoachResponse(BaseModel):
  reply: str
