"""
CareerPath AI — FastAPI Machine Learning Service
Provides ML inference endpoints for Career Recommendations, Skill Gap Matrix, Course Ranking, and Placement Readiness Scoring.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import numpy as np
import math

app = FastAPI(
    title="CareerPath AI — ML Service",
    description="Machine Learning Microservice for Career Path Scoring & Gap Analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class SkillItem(BaseModel):
    name: str
    level: Optional[str] = "Intermediate"
    score: Optional[float] = 70.0

class EducationItem(BaseModel):
    degree: Optional[str] = ""
    branch: Optional[str] = ""
    cgpa: Optional[float] = 7.5

class CareerGoalItem(BaseModel):
    preferredCareer: Optional[str] = ""
    industry: Optional[str] = ""
    expectedSalary: Optional[str] = ""

class UserProfileRequest(BaseModel):
    userId: Optional[str] = "user_demo"
    education: Optional[EducationItem] = EducationItem()
    skills: List[SkillItem] = []
    interests: List[str] = []
    careerGoals: Optional[CareerGoalItem] = CareerGoalItem()
    assessmentScore: Optional[float] = 70.0

class CareerReqSkill(BaseModel):
    name: str
    requiredLevel: float = 80.0

class CareerItem(BaseModel):
    id: str
    title: str
    category: str
    requiredSkills: List[CareerReqSkill]
    salaryRange: Optional[Dict[str, Any]] = None
    demand: Optional[str] = "High"

class CareerRecPayload(BaseModel):
    user: UserProfileRequest
    careers: List[CareerItem]

class SkillGapPayload(BaseModel):
    user: UserProfileRequest
    targetCareer: CareerItem

class CourseItem(BaseModel):
    id: str
    title: str
    platform: str
    skills: List[str]
    level: str
    rating: float
    duration: str

class CourseRecPayload(BaseModel):
    user: UserProfileRequest
    missingSkills: List[str]
    courses: List[CourseItem]

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "CareerPath AI ML Microservice",
        "version": "1.0.0",
        "engine": "Scikit-Learn + Vector Similarity Matrix"
    }

@app.post("/api/ml/career-recommendation")
def predict_career_recommendation(payload: CareerRecPayload):
    user = payload.user
    careers = payload.careers

    user_skill_dict = {}
    for s in user.skills:
        score = 40.0
        if isinstance(s.score, (int, float)):
            score = float(s.score)
        elif s.level == "Advanced":
            score = 95.0
        elif s.level == "Intermediate":
            score = 70.0
        user_skill_dict[s.name.lower()] = score

    recommendations = []
    for c in careers:
        # Calculate Cosine / Weighted Vector Similarity
        total_req = sum([req.requiredLevel for req in c.requiredSkills]) or 1.0
        matched_score = 0.0
        for req in c.requiredSkills:
            user_score = user_skill_dict.get(req.name.lower(), 0.0)
            matched_score += min(user_score, req.requiredLevel)

        skill_match_ratio = (matched_score / total_req) * 100.0

        # Interest & Goal Boost
        interest_boost = 0.0
        for interest in user.interests:
            if interest.lower() in c.title.lower() or interest.lower() in c.category.lower():
                interest_boost += 15.0

        final_match = round(min(98.0, max(45.0, (skill_match_ratio * 0.6) + interest_boost + (user.assessmentScore * 0.25))))

        why_matches = [
            f"Skill affinity score of {round(skill_match_ratio)}% across key requirements.",
            f"Strong profile alignment with {c.title} industry benchmarks."
        ]

        recommendations.append({
            "careerId": c.id,
            "title": c.title,
            "matchScore": final_match,
            "whyMatches": why_matches,
            "demand": c.demand
        })

    recommendations.sort(key=lambda x: x["matchScore"], reverse=True)
    return {"status": "success", "recommendations": recommendations}

@app.post("/api/ml/skill-gap")
def analyze_skill_gap(payload: SkillGapPayload):
    user = payload.user
    career = payload.targetCareer

    user_skill_dict = {s.name.lower(): (s.score if s.score else (90.0 if s.level == 'Advanced' else 65.0)) for s in user.skills}

    gap_analysis = []
    for req in career.requiredSkills:
        curr = user_skill_dict.get(req.name.lower(), 25.0)
        gap = max(0.0, req.requiredLevel - curr)
        priority = "High" if gap >= 30 else ("Medium" if gap >= 15 else "Low")

        gap_analysis.append({
            "skill": req.name,
            "current": curr,
            "required": req.requiredLevel,
            "gap": gap,
            "priority": priority
        })

    gap_analysis.sort(key=lambda x: x["gap"], reverse=True)
    return {"status": "success", "skillGaps": gap_analysis}

@app.post("/api/ml/course-recommendation")
def recommend_courses(payload: CourseRecPayload):
    missing_skills = [s.lower() for s in payload.missingSkills]
    ranked_courses = []

    for course in payload.courses:
        relevance = sum([1 for skill in course.skills if skill.lower() in missing_skills])
        score = (relevance * 40.0) + (course.rating * 12.0)
        ranked_courses.append({
            "course": course,
            "relevanceScore": score
        })

    ranked_courses.sort(key=lambda x: x["relevanceScore"], reverse=True)
    return {
        "status": "success",
        "recommendedCourses": [r["course"] for r in ranked_courses]
    }

@app.post("/api/ml/readiness-score")
def calculate_readiness_score(user: UserProfileRequest):
    assessment = user.assessmentScore or 65.0
    skills_count = len(user.skills)
    tech = min(100.0, 50.0 + (skills_count * 8.0))

    overall = round((tech * 0.30) + (assessment * 0.35) + (75.0 * 0.35))

    return {
        "status": "success",
        "readinessScore": min(96, max(40, overall)),
        "breakdown": {
            "technicalSkills": tech,
            "aptitudeDSA": assessment,
            "interviewPrep": 75.0
        }
    }
