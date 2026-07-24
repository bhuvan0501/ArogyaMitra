from fastapi import APIRouter, Depends

from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()


@router.get("/videos")
def search_videos(current_user: User = Depends(get_current_active_user)):
  return {"detail": "YouTube search endpoint placeholder"}


@router.get("/recipes")
def search_recipes(current_user: User = Depends(get_current_active_user)):
  return {"detail": "Spoonacular endpoint placeholder"}
