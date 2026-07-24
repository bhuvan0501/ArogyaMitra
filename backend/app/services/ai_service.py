import json

from fastapi import HTTPException, status
from pydantic import ValidationError

from app.clients.groq_client import GroqClient
from app.models.health_profile import HealthProfile
from app.schemas.nutrition_plan import NutritionPlanContent
from app.schemas.plan_adaptation import PlanAdaptationContent, PlanAdaptationRequest
from app.schemas.workout_plan import WorkoutPlanContent


class AiService:
  def __init__(self, groq_client: GroqClient | None = None):
    self.groq_client = groq_client or GroqClient()

  def generate_workout_plan(self, profile: HealthProfile) -> WorkoutPlanContent:
    messages = [
      {
        "role": "system",
        "content": (
          "You are a certified fitness planning assistant. Return only valid JSON. "
          "Do not include markdown, comments, or extra text. Do not provide medical diagnosis."
        ),
      },
      {
        "role": "user",
        "content": self._build_workout_prompt(profile),
      },
    ]

    try:
      raw_content = self.groq_client.create_json_completion(messages)
      parsed = self._parse_json_object(raw_content)
      return WorkoutPlanContent.model_validate(parsed)
    except (json.JSONDecodeError, ValidationError, ValueError) as exc:
      raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="AI response could not be validated as a workout plan",
      ) from exc

  def generate_nutrition_plan(self, profile: HealthProfile) -> NutritionPlanContent:
    messages = [
      {
        "role": "system",
        "content": (
          "You are a certified nutrition planning assistant. Return only valid JSON. "
          "Do not include markdown, comments, or extra text. Avoid foods that conflict with allergies."
        ),
      },
      {
        "role": "user",
        "content": self._build_nutrition_prompt(profile),
      },
    ]

    try:
      raw_content = self.groq_client.create_json_completion(messages)
      parsed = self._parse_json_object(raw_content)
      return NutritionPlanContent.model_validate(parsed)
    except (json.JSONDecodeError, ValidationError, ValueError) as exc:
      raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="AI response could not be validated as a nutrition plan",
      ) from exc

  def adapt_plans(
    self,
    profile: HealthProfile,
    changes: PlanAdaptationRequest,
    workout_plan: dict,
    nutrition_plan: dict,
  ) -> PlanAdaptationContent:
    messages = [
      {
        "role": "system",
        "content": (
          "You are an agentic health planning assistant for ArogyaMitra. Return only valid JSON. "
          "Modify only the workout days and meals directly affected by the user's new context. "
          "Keep unaffected days, meals, macros, recipe queries, and exercise structure unchanged. "
          "Do not regenerate the whole plan creatively. Explain exactly what changed and what stayed unchanged. "
          "Do not diagnose injuries; make conservative adjustments and recommend medical care for serious symptoms."
        ),
      },
      {
        "role": "user",
        "content": self._build_adaptation_prompt(profile, changes, workout_plan, nutrition_plan),
      },
    ]

    try:
      raw_content = self.groq_client.create_json_completion(messages)
      parsed = self._parse_json_object(raw_content)
      return PlanAdaptationContent.model_validate(parsed)
    except (json.JSONDecodeError, ValidationError, ValueError) as exc:
      raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="AI response could not be validated as an adaptive plan update",
      ) from exc

  def _parse_json_object(self, raw_content: str) -> dict:
    parsed = json.loads(raw_content)
    if not isinstance(parsed, dict):
      raise ValueError("AI response must be a JSON object")
    return parsed

  def _build_workout_prompt(self, profile: HealthProfile) -> str:
    return f"""
Create a personalized 7 day workout plan for this user profile.

User Profile:
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

Return one valid JSON object in exactly this shape:
{{
  "title": "string",
  "days": [
    {{
      "day": "Monday",
      "total_calories": 450,
      "focus": "string",
      "warm_up": "string",
      "exercises": [
        {{
          "name": "string",
          "sets": 3,
          "reps": 15,
          "duration": "string (e.g. '3 min', '45 sec')",
          "difficulty": "Beginner | Intermediate | Advanced",
          "calories": 40,
          "muscle_group": "string (e.g. 'Chest', 'Legs', 'Core', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Cardio', 'Full Body')",
          "instructions": "string"
        }}
      ],
      "rest_time": "string",
      "cool_down": "string",
      "daily_tip": "string",
      "youtube_search_query": "string"
    }}
  ]
}}

Rules:
- Include exactly 7 days.
- Use weekday names in order: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
- Every day must include warm_up, exercises, rest_time, cool_down, daily_tip, and youtube_search_query.
- Every day must include total_calories as a number for estimated workout calories burned that day.
- Every exercise must include all fields: name, sets, reps, duration, difficulty, calories, muscle_group, instructions.
- sets must be a number. reps must be a number when repetition-based, or short text like "30 sec" for time-based work.
- difficulty must be exactly one of: Beginner, Intermediate, Advanced.
- calories must be a number based on exercise intensity.
- duration must be a short string like "4 min" or "30 sec" representing total exercise time.
- muscle_group must name the primary muscle targeted.
- Keep exercises appropriate for the user's profile and time available.
- Include rest or active recovery days when appropriate.
- Do not return paragraphs, markdown, comments, or explanatory text outside the JSON object.
"""


  def _build_nutrition_prompt(self, profile: HealthProfile) -> str:
    return f"""
Create a personalized 7 day nutrition plan for this user profile.

User Profile:
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

Return one valid JSON object in exactly this shape:
{{
  "title": "string",
  "days": [
    {{
      "day": 1,
      "breakfast": {{
        "name": "string",
        "description": "string",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "recipe_search_query": "string"
      }},
      "lunch": {{
        "name": "string",
        "description": "string",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "recipe_search_query": "string"
      }},
      "snacks": {{
        "name": "string",
        "description": "string",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "recipe_search_query": "string"
      }},
      "dinner": {{
        "name": "string",
        "description": "string",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "recipe_search_query": "string"
      }},
      "total_calories": 0,
      "total_protein": 0,
      "total_carbs": 0,
      "total_fat": 0,
      "daily_tip": "string"
    }}
  ]
}}

Rules:
- Include exactly 7 days.
- Every day must include breakfast, lunch, snacks, dinner, macros, daily_tip, and recipe_search_query values.
- Calories and macros must be numbers, not strings.
- Recipe search queries must be short Spoonacular-friendly food queries.
- Respect dietary preference, allergies, goal, and activity level.
- Do not include unsafe medical advice.
- Do not return paragraphs, markdown, comments, or explanatory text outside the JSON object.
"""

  def _build_adaptation_prompt(
    self,
    profile: HealthProfile,
    changes: PlanAdaptationRequest,
    workout_plan: dict,
    nutrition_plan: dict,
  ) -> str:
    return f"""
Adapt the existing workout and nutrition plans based only on these new user updates.

User Profile:
- Name: {profile.name}
- Age: {profile.age}
- Gender: {profile.gender}
- Height: {profile.height} cm
- Weight: {profile.weight} kg
- Goal: {profile.goal}
- Activity Level: {profile.activity_level}
- Workout Preference: {profile.workout_preference}
- Default Time Available: {profile.time_available} minutes per day
- Dietary Preference: {profile.dietary_preference}
- Allergies: {profile.allergies or "None provided"}
- Medical Conditions: {profile.medical_conditions or "None provided"}

New Updates:
- Mood: {changes.mood or "No change"}
- Injury: {changes.injury or "No change"}
- Travel: {changes.travel or "No change"}
- Time Availability: {changes.time_available if changes.time_available is not None else "No change"} minutes

Existing Workout Plan:
{json.dumps(workout_plan)}

Existing Nutrition Plan:
{json.dumps(nutrition_plan)}

Return one valid JSON object in exactly this shape:
{{
  "explanation": {{
    "summary": "string",
    "workout_changes": ["string"],
    "nutrition_changes": ["string"],
    "unchanged": ["string"]
  }},
  "workout_plan": {{
    "title": "string",
    "days": [
      {{
        "day": "Monday",
        "total_calories": 450,
        "focus": "string",
        "warm_up": "string",
        "exercises": [
          {{
            "name": "string",
            "sets": 3,
            "reps": 15,
            "duration": "string",
            "difficulty": "Beginner | Intermediate | Advanced",
            "calories": 40,
            "muscle_group": "string",
            "instructions": "string"
          }}
        ],
        "rest_time": "string",
        "cool_down": "string",
        "daily_tip": "string",
        "youtube_search_query": "string"
      }}
    ]
  }},
  "nutrition_plan": {{
    "title": "string",
    "days": []
  }}
}}

Rules:
- Return complete workout_plan and nutrition_plan objects with exactly 7 days each.
- Preserve structured JSON types: workout day as weekday string, total_calories as number, exercise sets/calories as numbers, nutrition calories/macros as numbers.
- Only alter affected days, exercises, rest, tips, meals, macros, and recipe queries.
- If mood changes, adjust intensity, tips, or simpler meals only where helpful.
- If injury changes, replace risky exercises and keep nutrition mostly unchanged unless recovery support is relevant.
- If travel changes, prefer portable workouts and accessible meals only for affected context.
- If time_available changes, shorten workouts and simplify meals only as needed.
- Preserve unaffected content exactly where possible.
- Include clear explanations of what changed and what stayed unchanged.
- Do not return paragraphs, markdown, comments, or explanatory text outside the JSON object.
"""
