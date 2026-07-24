from groq import Groq
from fastapi import HTTPException, status

from app.core.config import settings


class GroqClient:
  def __init__(self):
    if not settings.GROQ_API_KEY:
      raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="Groq API key is not configured",
      )
    self.client = Groq(api_key=settings.GROQ_API_KEY)

  def create_json_completion(self, messages: list[dict[str, str]]) -> str:
    response = self.client.chat.completions.create(
      model=settings.GROQ_MODEL,
      messages=messages,
      temperature=0.4,
      response_format={"type": "json_object"},
    )

    return response.choices[0].message.content

  def create_markdown_completion(self, messages: list[dict[str, str]]) -> str:
    response = self.client.chat.completions.create(
      model=settings.GROQ_MODEL,
      messages=messages,
      temperature=0.5,
    )

    return response.choices[0].message.content
