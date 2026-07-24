from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.health_profile import HealthProfileCreate, HealthProfileRead, HealthProfileUpdate
from app.services.health_profile_service import HealthProfileService

router = APIRouter()


@router.post("/me", response_model=HealthProfileRead, status_code=status.HTTP_201_CREATED)
def create_my_health_profile(
  payload: HealthProfileCreate,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  profile = HealthProfileService(db).create_current_profile(current_user.id, payload)
  if profile is None:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Health profile already exists")
  return profile


@router.get("/me", response_model=HealthProfileRead)
def read_my_health_profile(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  profile = HealthProfileService(db).get_current_profile(current_user.id)
  if profile is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Health profile not found")
  return profile


@router.put("/me", response_model=HealthProfileRead)
def update_my_health_profile(
  payload: HealthProfileUpdate,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  profile = HealthProfileService(db).update_current_profile(current_user.id, payload)
  if profile is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Health profile not found")
  return profile


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_health_profile(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_active_user),
):
  deleted = HealthProfileService(db).delete_current_profile(current_user.id)
  if not deleted:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Health profile not found")
  return Response(status_code=status.HTTP_204_NO_CONTENT)
