from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.db.session import Base, engine
from app.models import chat_message  # noqa: F401
from app.models import health_profile  # noqa: F401
from app.models import nutrition_plan  # noqa: F401
from app.models import progress_entry  # noqa: F401
from app.models import user  # noqa: F401
from app.models import workout_plan  # noqa: F401


def create_app() -> FastAPI:
  app = FastAPI(title=settings.APP_NAME)

  app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  )

  app.include_router(api_router, prefix="/api/v1")

  @app.on_event("startup")
  def on_startup() -> None:
    Base.metadata.create_all(bind=engine)

  return app


app = create_app()
