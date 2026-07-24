from functools import cached_property

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
  APP_NAME: str = "ArogyaMitra"
  APP_ENV: str = "development"
  SECRET_KEY: str = "change-me"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
  DATABASE_URL: str = "sqlite:///./arogyamitra.db"
  BACKEND_CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
  GROQ_API_KEY: str = ""
  GROQ_MODEL: str = "llama-3.3-70b-versatile"
  YOUTUBE_API_KEY: str = ""
  SPOONACULAR_API_KEY: str = ""

  model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

  @cached_property
  def cors_origins(self) -> list[str]:
    return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
