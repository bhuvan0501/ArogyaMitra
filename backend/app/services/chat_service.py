from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.clients.groq_client import GroqClient
from app.models.health_profile import HealthProfile
from app.repositories.chat_repository import ChatRepository
from app.repositories.health_profile_repository import HealthProfileRepository


class ChatService:
  def __init__(self, db: Session, groq_client: GroqClient | None = None):
    self.messages = ChatRepository(db)
    self.health_profiles = HealthProfileRepository(db)
    self.groq_client = groq_client or GroqClient()

  def get_history(self, user_id: int):
    return self.messages.list_by_user_id(user_id)

  def clear_history(self, user_id: int) -> None:
    self.messages.delete_by_user_id(user_id)

  def create_reply(self, user_id: int, message: str):
    profile = self.health_profiles.get_by_user_id(user_id)
    if profile is None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Create a health profile before chatting with AROMI",
      )

    history = self.messages.list_by_user_id(user_id, limit=20)
    self.messages.create(user_id, "user", message)
    reply = self.groq_client.create_markdown_completion(self._build_messages(profile, history, message))
    assistant_message = self.messages.create(user_id, "assistant", reply)
    updated_history = self.messages.list_by_user_id(user_id)
    return assistant_message, updated_history

  def _build_messages(self, profile: HealthProfile, history, current_message: str) -> list[dict[str, str]]:
    messages = [
      {
        "role": "system",
        "content": (
          "You are AROMI, ArogyaMitra's supportive AI health and fitness coach. "
          "Answer in markdown. Help with workout doubts, injury-safe adjustments, travel adjustments, "
          "time constraints, and motivation. Keep advice practical and personalized. "
          "Do not diagnose medical conditions. For pain, injury, chest pain, dizziness, or serious symptoms, "
          "recommend consulting a qualified medical professional."
        ),
      },
      {
        "role": "user",
        "content": self._profile_context(profile),
      },
    ]

    for item in history:
      if item.role in {"user", "assistant"}:
        messages.append({"role": item.role, "content": item.content})

    messages.append({"role": "user", "content": current_message})
    return messages

  def _profile_context(self, profile: HealthProfile) -> str:
    return f"""
Use this user profile as context for all coaching:
- Name: {profile.name}
- Age: {profile.age}
- Gender: {profile.gender}
- Height: {profile.height} cm
- Weight: {profile.weight} kg
- Goal: {profile.goal}
- Activity Level: {profile.activity_level}
- Workout Preference: {profile.workout_preference}
- Time Available: {profile.time_available} minutes per day
- Dietary Preference: {profile.dietary_preference}
- Allergies: {profile.allergies or "None provided"}
- Medical Conditions: {profile.medical_conditions or "None provided"}
"""
