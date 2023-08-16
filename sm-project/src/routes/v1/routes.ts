import * as users from '../../controllers/users';
import * as projects from '../../controllers/projects';
import * as scopes from '../../controllers/scopes';
import * as categories from '../../controllers/categories';
import * as departments from '../../controllers/departments';
import * as lessons from '../../controllers/lessons';
import * as decisionRegisters from '../../controllers/decisionRegisters';
import * as issueRegisters from '../../controllers/issueRegisters';
import * as riskRegisters from '../../controllers/riskRegisters';
import * as keychanges from '../../controllers/keychanges';
import * as objectives from '../../controllers/objectives';
import * as benefits from '../../controllers/benefits';
import * as objectiveBenefits from '../../controllers/objectiveBenefits';
import * as changeApproaches from '../../controllers/changeApproaches';
import * as budgets from '../../controllers/budgets';
import * as budgetItems from '../../controllers/budgetItems';
import * as stakeholders from '../../controllers/stakeholders';
import * as KeyChangeDepartment from '../../controllers/keychangeDepartments';
import * as KeyImpactDepartment from '../../controllers/keyimpactDepartments';
import * as RiskObstacles from '../../controllers/riskObstacles';
import * as RiskLevers from '../../controllers/risklevers';
import * as RiskRatings from '../../controllers/riskRatings';
import * as KeyChangePrioritisations from '../../controllers/keychangePrioritisations';
import * as KeyImpact from '../../controllers/keyImpact';
import * as KeyImpactBarrier from '../../controllers/keyImpactBarriers';
import * as caseForChanges from '../../controllers/caseForChange';
import * as Notes from '../../controllers/notes';
import * as HighLevelPlans from '../../controllers/highLevelPlans';
import * as Auth from '../../middleware/auth';
import express from "express";

export const attachPublicRoutes = (app: express.Application): void => {

  app.post('/api/v1/auth/login', users.login)
  app.get('/api/v1/user', Auth.authorize(), users.getUser)
  app.get('/api/v1/users', Auth.authorize(), users.getUsers)

  //Project routes
  app.get('/api/v1/projects',   Auth.authorize(), projects.getProjects)
  app.get('/api/v1/projects/:id',     Auth.authorize(), projects.getProgress)
  app.post('/api/v1/projects',   Auth.authorize(), projects.addProject)
  app.patch('/api/v1/projects',  Auth.authorize(), projects.updateProject)
  app.delete('/api/v1/projects/',Auth.authorize(), projects.deleteProgress)


  //Scope routes
  app.get('/api/v1/scopes', Auth.authorize(), scopes.getScopes)
  app.get('/api/v1/scopes/:id', Auth.authorize(), scopes.getScope)
  app.post('/api/v1/scopes',    Auth.authorize(), scopes.addScope)
  app.patch('/api/v1/scopes',   Auth.authorize(), scopes.updateScope)
  app.delete('/api/v1/scopes/:id', Auth.authorize(), scopes.deleteScope)

  //Key Change routes
  app.get('/api/v1/key-changes', Auth.authorize(), keychanges.getKeyChanges)
  app.get('/api/v1/key-changes/:id', Auth.authorize(), keychanges.getKeyChanges)
  app.post('/api/v1/key-changes',    Auth.authorize(), keychanges.addKeyChange)
  app.patch('/api/v1/key-changes',   Auth.authorize(), keychanges.addKeyChange)
  app.delete('/api/v1/key-changes/:id', Auth.authorize(), keychanges.deleteKeyChange)

  //Objective routes
  app.get('/api/v1/objectives', Auth.authorize(), objectives.getObjectives)
  app.get('/api/v1/objectives/:id', Auth.authorize(), objectives.getObjective)
  app.post('/api/v1/objectives',    Auth.authorize(), objectives.addObjective)
  app.patch('/api/v1/objectives',   Auth.authorize(), objectives.updateObjective)
  app.delete('/api/v1/objectives/', Auth.authorize(), objectives.deleteObjective)

  // Benefit routes
  app.get('/api/v1/benefits', Auth.authorize(), benefits.getBenefits)
  app.get('/api/v1/benefits/:id', Auth.authorize(), benefits.getBenefit)
  app.post('/api/v1/benefits', Auth.authorize(), benefits.addBenefit)
  app.patch('/api/v1/benefits', Auth.authorize(), benefits.updateBenefit)
  app.delete('/api/v1/benefits/', Auth.authorize(), benefits.deleteBenefit)

  // Benefit routes
  app.get('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.getObjectiveBenefits)
  app.get('/api/v1/objective-benefits/:id', Auth.authorize(), objectiveBenefits.getObjectiveBenefit)
  app.post('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.addObjectiveBenefit)
  app.patch('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.updateObjectiveBenefit)
  app.delete('/api/v1/objective-benefits/', Auth.authorize(), objectiveBenefits.deleteObjectiveBenefit)


  // Budget routes
  app.get('/api/v1/budgets', Auth.authorize(), budgets.getBudgets)
  app.get('/api/v1/budgets/:id', Auth.authorize(), budgets.getBudget)
  app.post('/api/v1/budgets', Auth.authorize(), budgets.addBudget)
  app.patch('/api/v1/budgets', Auth.authorize(), budgets.updateBudget)
  app.delete('/api/v1/budgets/', Auth.authorize(), budgets.deleteBudget)

  // BudgetItem routes
  app.get('/api/v1/budget-items', Auth.authorize(), budgetItems.getBudgetItems);
  app.get('/api/v1/budget-items/:id', Auth.authorize(), budgetItems.getBudgetItem);
  app.post('/api/v1/budget-items', Auth.authorize(), budgetItems.addBudgetItem);
  app.patch('/api/v1/budget-items', Auth.authorize(), budgetItems.updateBudgetItem);
  app.delete('/api/v1/budget-items/', Auth.authorize(), budgetItems.deleteBudgetItem);

  // CaseForChange routes
  app.get('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.getCaseForChanges);
  app.get('/api/v1/case-for-changes/:id', Auth.authorize(), caseForChanges.getCaseForChange);
  app.post('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.addCaseForChange);
  app.patch('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.updateCaseForChange);
  app.delete('/api/v1/case-for-changes/', Auth.authorize(), caseForChanges.deleteCaseForChange);


  //Category routes
  app.get('/api/v1/categories',          Auth.authorize(), categories.getCategories)
  app.get('/api/v1/categories/:id',      Auth.authorize(), categories.getCategory)
  app.post('/api/v1/categories',    Auth.authorize(), categories.addCategory)
  app.patch('/api/v1/categories',   Auth.authorize(), categories.updateCategory)
  app.delete('/api/v1/categories/', Auth.authorize(), categories.deleteCategory)

  // ChangeApproach routes
  app.get('/api/v1/change-approaches',              Auth.authorize(), changeApproaches.getChangeApproaches)
  app.get('/api/v1/change-approaches/:id',          Auth.authorize(), changeApproaches.getChangeApproach)
  app.post('/api/v1/change-approaches',        Auth.authorize(), changeApproaches.addChangeApproach)
  app.patch('/api/v1/change-approaches/:id',   Auth.authorize(), changeApproaches.updateChangeApproach)
  app.delete('/api/v1/change-approaches/:id',  Auth.authorize(), changeApproaches.deleteChangeApproach)

  //Department routes
  app.get('/api/v1/departments',          Auth.authorize(), departments.getDepartments)
  app.get('/api/v1/departments/:id',      Auth.authorize(), departments.getDepartments)
  app.post('/api/v1/departments',    Auth.authorize(), departments.addDepartment)
  app.patch('/api/v1/departments',   Auth.authorize(), departments.updateDepartment)
  app.delete('/api/v1/departments/', Auth.authorize(), departments.deleteDepartment)

  //Lessons Learnt Log routes
  app.get('/api/v1/lessons',          Auth.authorize(), lessons.getLessons)
  app.get('/api/v1/lessons/:id',      Auth.authorize(), lessons.getLesson)
  app.post('/api/v1/lessons',    Auth.authorize(), lessons.addLesson)
  app.patch('/api/v1/lessons',   Auth.authorize(), lessons.updateLesson)
  app.delete('/api/v1/lessons/', Auth.authorize(), lessons.deleteLesson)

  //Decision routes
  app.get('/api/v1/decisions',     Auth.authorize(), decisionRegisters.getDecisions)
  app.get('/api/v1/decisions/:id',     Auth.authorize(), decisionRegisters.getDecisionRegister)
  app.post('/api/v1/decisions',   Auth.authorize(), decisionRegisters.addDecisionRegister)
  app.patch('/api/v1/decisions',  Auth.authorize(), decisionRegisters.updateDecisionRegister)
  app.delete('/api/v1/decisions/',Auth.authorize(), decisionRegisters.deleteDecisionRegister)

  // Issue routes
  app.get('/api/v1/issues',     Auth.authorize(), issueRegisters.getIssues)
  app.get('/api/v1/issues/:id',     Auth.authorize(), issueRegisters.getIssueRegister)
  app.post('/api/v1/issues',   Auth.authorize(), issueRegisters.addIssueRegister)
  app.patch('/api/v1/issues',  Auth.authorize(), issueRegisters.updateIssueRegister)
  app.delete('/api/v1/issues/',Auth.authorize(), issueRegisters.deleteIssueRegister)

  // Risk routes
  app.get('/api/v1/risks',     Auth.authorize(), riskRegisters.getRisks)
  app.get('/api/v1/risks/:id', Auth.authorize(), riskRegisters.getRiskRegister)
  app.post('/api/v1/risks',    Auth.authorize(), riskRegisters.addRiskRegister)
  app.patch('/api/v1/risks',   Auth.authorize(), riskRegisters.updateRiskRegister)
  app.delete('/api/v1/risks/', Auth.authorize(), riskRegisters.deleteRiskRegister)


  // Stakeholder routes
  app.get('/api/v1/stakeholders',     Auth.authorize(), stakeholders.getStakeholders)
  app.get('/api/v1/stakeholders/:id', Auth.authorize(), stakeholders.getStakeholder)
  app.post('/api/v1/stakeholders',    Auth.authorize(), stakeholders.addStakeholder)
  app.patch('/api/v1/stakeholders',   Auth.authorize(), stakeholders.updateStakeholder)
  app.delete('/api/v1/stakeholders/', Auth.authorize(), stakeholders.deleteStakeholder)

  app.get('/api/v1/Key-change-departments',     Auth.authorize(), KeyChangeDepartment.getKeyChangeDepartments)
  app.get('/api/v1/Key-change-departments/:id', Auth.authorize(), KeyChangeDepartment.getKeyChangeDepartment)
  app.post('/api/v1/Key-change-departments',    Auth.authorize(), KeyChangeDepartment.addKeyChangeDepartment)
  app.patch('/api/v1/Key-change-departments',   Auth.authorize(), KeyChangeDepartment.updateKeyChangeDepartment)
  app.delete('/api/v1/Key-change-departments/', Auth.authorize(), KeyChangeDepartment.deleteKeyChangeDepartment)

  app.get('/api/v1/key-impacts',                 KeyImpact.getKeyImpacts)
  app.get('/api/v1/key-impacts/:id',            Auth.authorize(), KeyImpact.getKeyImpact)
  app.post('/api/v1/key-impacts',               Auth.authorize(), KeyImpact.addKeyImpact)
  app.patch('/api/v1/key-impacts/:id',          Auth.authorize(), KeyImpact.updateKeyImpact)
  app.delete('/api/v1/key-impacts/:id',         Auth.authorize(), KeyImpact.deleteKeyImpact)


  app.get('/api/v1/barriers',         Auth.authorize(), KeyImpactBarrier.getBarriers)
  app.get('/api/v1/barriers/:id',     Auth.authorize(), KeyImpactBarrier.getKeyImpactBarrier)
  app.post('/api/v1/barriers',   Auth.authorize(), KeyImpactBarrier.addKeyImpactBarrier)
  app.patch('/api/v1/barriers',  Auth.authorize(), KeyImpactBarrier.updateKeyImpactBarrier)
  app.delete('/api/v1/barriers/',Auth.authorize(), KeyImpactBarrier.deleteKeyImpactBarrier)

  app.get('/api/v1/Key-impact-departments',     Auth.authorize(), KeyImpactDepartment.getKeyImpactDepartments)
  app.get('/api/v1/Key-impact-departments/:id', Auth.authorize(), KeyImpactDepartment.getKeyImpactDepartment)
  app.post('/api/v1/Key-impact-departments',    Auth.authorize(), KeyImpactDepartment.addKeyImpactDepartment)
  app.patch('/api/v1/Key-impact-departments',   Auth.authorize(), KeyImpactDepartment.updateKeyImpactDepartment)
  app.delete('/api/v1/Key-impact-departments/', Auth.authorize(), KeyImpactDepartment.deleteKeyImpactDepartment)


  app.get('/api/v1/risk-obstacles',               Auth.authorize(), RiskObstacles.getRiskObstacles)
  app.get('/api/v1/risk-obstacles/:id',           Auth.authorize(), RiskObstacles.getRiskObstacle)
  app.post('/api/v1/risk-obstacles',              Auth.authorize(), RiskObstacles.addRiskObstacle)
  app.patch('/api/v1/risk-obstacles/:id',         Auth.authorize(), RiskObstacles.updateRiskObstacle)
  app.delete('/api/v1/risk-obstacles/:id',        Auth.authorize(), RiskObstacles.deleteRiskObstacle)

  app.get('/api/v1/risk-levers', Auth.authorize(), RiskLevers.getRiskLevers); // Updated route path
  app.get('/api/v1/risk-levers/:id', Auth.authorize(), RiskLevers.getRiskLever); // Updated route path
  app.post('/api/v1/risk-levers', Auth.authorize(), RiskLevers.addRiskLever); // Updated route path
  app.patch('/api/v1/risk-levers/:id', Auth.authorize(), RiskLevers.updateRiskLever); // Updated route path
  app.delete('/api/v1/risk-levers/:id', Auth.authorize(), RiskLevers.deleteRiskLever); // Updated route path

  app.get('/api/v1/risk-ratings', Auth.authorize(), RiskRatings.getRiskRatings); // Updated route path and handler reference
  app.get('/api/v1/risk-ratings/:id', Auth.authorize(), RiskRatings.getRiskRating); // Updated route path and handler reference
  app.post('/api/v1/risk-ratings', Auth.authorize(), RiskRatings.addRiskRating); // Updated route path and handler reference
  app.patch('/api/v1/risk-ratings/:id', Auth.authorize(), RiskRatings.updateRiskRating); // Updated route path and handler reference
  app.delete('/api/v1/risk-ratings/:id', Auth.authorize(), RiskRatings.deleteRiskRating); // Updated route path and handler reference


  app.get('/api/v1/key-change-prioritisations', Auth.authorize(), KeyChangePrioritisations.getKeyChangePrioritisations);
  app.get('/api/v1/key-change-prioritisations/:id', Auth.authorize(), KeyChangePrioritisations.getKeyChangePrioritisation);
  app.post('/api/v1/key-change-prioritisations', Auth.authorize(), KeyChangePrioritisations.addKeyChangePrioritisation);
  app.patch('/api/v1/key-change-prioritisations/:id', Auth.authorize(), KeyChangePrioritisations.updateKeyChangePrioritisation);
  app.delete('/api/v1/key-change-prioritisations/:id', Auth.authorize(), KeyChangePrioritisations.deleteKeyChangePrioritisation);

  app.get('/api/v1/notes',     Auth.authorize(), Notes.getNotes)
  app.get('/api/v1/notes/:id', Auth.authorize(), Notes.getNote)
  app.post('/api/v1/notes',    Auth.authorize(), Notes.addNote)
  app.patch('/api/v1/notes',   Auth.authorize(), Notes.updateNote)
  app.delete('/api/v1/notes/', Auth.authorize(), Notes.deleteNote)


  app.get('/api/v1/plans',       Auth.authorize(), HighLevelPlans.getHighLevelPlans)
  app.get('/api/v1/plans/:id',   Auth.authorize(), HighLevelPlans.getHighLevelPlan)
  app.post('/api/v1/plans',      Auth.authorize(), HighLevelPlans.addHighLevelPlan)
  app.patch('/api/v1/plans',     Auth.authorize(), HighLevelPlans.updateHighLevelPlan)
  app.delete('/api/v1/plans/',   Auth.authorize(), HighLevelPlans.deleteHighLevelPlan)


}