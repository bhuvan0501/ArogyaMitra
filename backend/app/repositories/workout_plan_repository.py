from sqlalchemy.orm import Session

from app.models.workout_plan import WorkoutPlan
from app.schemas.workout_plan import WorkoutPlanContent


class WorkoutPlanRepository:
  def __init__(self, db: Session):
    self.db = db

  def list_by_user_id(self, user_id: int) -> list[WorkoutPlan]:
    return (
      self.db.query(WorkoutPlan)
      .filter(WorkoutPlan.user_id == user_id)
      .order_by(WorkoutPlan.created_at.desc())
      .all()
    )

  def get_latest_by_user_id(self, user_id: int) -> WorkoutPlan | None:
    return (
      self.db.query(WorkoutPlan)
      .filter(WorkoutPlan.user_id == user_id)
      .order_by(WorkoutPlan.created_at.desc())
      .first()
    )

  def create(self, user_id: int, content: WorkoutPlanContent) -> WorkoutPlan:
    plan = WorkoutPlan(user_id=user_id, title=content.title, plan=content.model_dump())
    self.db.add(plan)
    self.db.commit()
    self.db.refresh(plan)
    return plan
