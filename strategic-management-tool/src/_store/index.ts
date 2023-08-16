import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
// import { profilesReducer } from './profile.slice'
import { projectReducer } from './project.slice'
import { decisionReducer } from './decisons.slice'
import { categoryReducer } from './category.slice'
import { departmentReducer } from './department.slice'
import { lessonReducer } from './lessons.slice'
import { scopeReducer } from './scopes.slice'
import { keyChangeReducer } from './keychanges.slice'
import { objectiveReducer } from './objectives.slice'
import { changeApproachReducer } from './changeapproaches.slice'
import { budgetReducer } from './budgets.slice'
import { budgetItemReducer } from './budgetItems.slice'
import { caseForChangeReducer } from './caseForChange.slice'
import { issueReducer } from './issues.slice'
import { riskReducer } from './risks.slice'
import { objectiveBenefitReducer } from './objectiveBenefits.slice'
import { stakeholderReducer } from './stakeholders.slice'
import { keyChangeDepartmentReducer } from './keyChangeDepartment.slice'
import { keyImpactReducer } from './keyImpact.slice'
import { barrierReducer } from './barriers.slice'
import { keyImpactDepartmentReducer } from './keyImpactDepartment.slice'
import { riskObstacleReducer } from './riskObstacle.slice'
import { riskLeverReducer } from './riskLever.slice'
import { riskRatingReducer } from './riskRating.slice'
import { keyChangePrioritisationReducer } from './keychangePrioritisation.slice'
import { noteReducer } from './notes.slice'
import { highLevelPlanReducer } from './highLevelPlans.slice'

export * from './auth.slice'
export * from './users.slice'
// export * from './profile.slice'
export * from './project.slice'
export * from './decisons.slice'
export * from './category.slice'
export * from './department.slice'
export * from './lessons.slice'
export * from './scopes.slice'
export * from './keychanges.slice'
export * from './objectives.slice'
export * from './changeapproaches.slice'
export * from './budgets.slice'
export * from './budgetItems.slice'
export * from './caseForChange.slice'
export * from './issues.slice'
export * from './risks.slice'
export * from './objectiveBenefits.slice'
export * from './stakeholders.slice'
export * from './keyChangeDepartment.slice'
export * from './keyImpact.slice'
export * from './barriers.slice'
export * from './keyImpactDepartment.slice'
export * from './riskObstacle.slice'
export * from './riskLever.slice'
export * from './riskRating.slice'
export * from './keychangePrioritisation.slice'
export * from './notes.slice'
export * from './highLevelPlans.slice'

// @ts-ignore
export const store = configureStore({
    reducer: {
        auth:        authReducer,
        users:       usersReducer,
        // profile:     profilesReducer,
        project:     projectReducer,
        decision:    decisionReducer,
        category:    categoryReducer,
        department:  departmentReducer,
        lessons:     lessonReducer,
        scopes:      scopeReducer,
        keychanges:  keyChangeReducer,
        objectives:  objectiveReducer,
        changeApproach:  changeApproachReducer,
        budget:  budgetReducer,
        budgetItem:  budgetItemReducer,
        caseForChange:  caseForChangeReducer,
        issue:  issueReducer,
        risk:  riskReducer,
        objectiveBenefit: objectiveBenefitReducer,
        stakeholder: stakeholderReducer,
        keyChangeDepartment: keyChangeDepartmentReducer,
        keyImpact: keyImpactReducer,
        barrier: barrierReducer,
        keyImpactDepartment: keyImpactDepartmentReducer,
        riskObstacle: riskObstacleReducer,
        riskLever: riskLeverReducer,
        riskRating: riskRatingReducer,
        keychangePrioritisation: keyChangePrioritisationReducer,
        note: noteReducer,
        plan: highLevelPlanReducer
    }
})