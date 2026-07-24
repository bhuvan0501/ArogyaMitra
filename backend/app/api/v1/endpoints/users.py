from fastapi import APIRouter, Depends

from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()


@router.get("/")
def list_users(current_user: User = Depends(get_current_active_user)):
  return {"detail": "Users endpoint placeholder"}
