from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.chat import ChatMessageRead, CoachMessageRequest, CoachResponse
from app.services.chat_service import ChatService

router = APIRouter()


@router.get("/coach/history", response_model=list[ChatMessageRead])
def read_coach_history(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  return ChatService(db).get_history(current_user.id)


@router.post("/coach", response_model=CoachResponse)
def create_coach_response(
  payload: CoachMessageRequest,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  reply, history = ChatService(db).create_reply(current_user.id, payload.message)
  return CoachResponse(reply=reply, history=history)


@router.delete("/coach/history", status_code=status.HTTP_204_NO_CONTENT)
def clear_coach_history(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  ChatService(db).clear_history(current_user.id)
  return Response(status_code=status.HTTP_204_NO_CONTENT)
