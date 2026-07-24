from sqlalchemy.orm import Session

from app.models.nutrition_plan import NutritionPlan
from app.schemas.nutrition_plan import NutritionPlanContent


class NutritionPlanRepository:
  def __init__(self, db: Session):
    self.db = db

  def list_by_user_id(self, user_id: int) -> list[NutritionPlan]:
    return (
      self.db.query(NutritionPlan)
      .filter(NutritionPlan.user_id == user_id)
      .order_by(NutritionPlan.created_at.desc())
      .all()
    )

  def get_latest_by_user_id(self, user_id: int) -> NutritionPlan | None:
    return (
      self.db.query(NutritionPlan)
      .filter(NutritionPlan.user_id == user_id)
      .order_by(NutritionPlan.created_at.desc())
      .first()
    )

  def create(self, user_id: int, content: NutritionPlanContent) -> NutritionPlan:
    plan = NutritionPlan(user_id=user_id, title=content.title, plan=content.model_dump())
    self.db.add(plan)
    self.db.commit()
    self.db.refresh(plan)
    return plan
