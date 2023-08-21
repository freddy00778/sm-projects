import * as React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import ProjectDashboardLayout from "../Layouts/Dashboard/ProjectDashboardLayout";
import ManagerDashboardLayout from "../Layouts/Dashboard/ManagerDashboardLayout";
import Login from "../Pages/Auth/Login";
import ResetInstructions from "../Pages/Auth/Instructions";
import PasswordReset from "../Pages/Auth/PasswordReset";
import Home from "../Pages/Project/Home";
import ProjectInformation from "../Pages/Project/ProjectInformation";
import Scope from "../Pages/Project/Scope";
import KeyChanges from "../Pages/Project/KeyChanges";
import ChangeApproach from "../Pages/Project/ChangeApproach";
import CmMatrix from "../Pages/Project/CmMatrix";
import Budget from "../Pages/Project/Budget";
import CaseChange from "../Pages/Project/CaseChange";
import TransitionCurve from "../Pages/Project/TransitionCurve";
import RiskRegister from "../Pages/Project/RiskRegister";
import IssueRegister from "../Pages/Project/IssueRegister";
import DecisionRegister from "../Pages/Project/DecisionRegister";
import Lessons from "../Pages/Project/Lessons";
import ManagerHome from "../Pages/Manager/Home";
import ManagerProjects from "../Pages/Manager/Projects";
import ExecutiveDashboardLayout from "../Layouts/Dashboard/ExecutiveDashboardLayout";
import Calendar from "../Pages/Executive/Calendar";
import ExecutiveHome from "../Pages/Executive/Home";
import ExecutiveProjects from "../Pages/Executive/Projects";
import KeyChangesPage from "../components/keyChanges/AddKeyChange/KeyChangesPage";
import ObjectivesPage from "../components/keyChanges/ObjectivesPage";
import StakeholdersPage from "../components/keyChanges/StakeholdersPage";
import KeyImpactPage from "../components/keyChanges/KeyImpactPage";
import RiskPage from "../components/keyChanges/RiskPage";
import RiskOne from "../components/RiskRegister/RiskPerKeyChange/RiskOne";
import IssueOne from "../components/IssueRegister/IssuePerKeyChange/IssueOne";
import ObjectiveForm from "../components/keyChanges/KeyChangeForms/ObjectiveForm";
import StakeholderForm from "../components/keyChanges/KeyChangeForms/StakeholderForm";
import KeyImpactForm from "../components/keyChanges/KeyChangeForms/KeyImpactForm";
import PriorityPage from "../components/keyChanges/PriorityPage";
import PriorityForm from "../components/keyChanges/KeyChangeForms/PriorityForm";
import BudgetForm from "../components/Budget/BudgetForm";
import KeyDates from "../Pages/Project/KeyDates";
import PrivateRoute from "./PrivateRoute";
const isAuthenticated = true
import ManagerKeyDates from "../Pages/Manager/KeyDate";
import ExecutiveKeyDate from "../Pages/Executive/ExecutiveKeyDate";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/reset",
            element: <PasswordReset />,
          },
          {
            path: "/instruction",
            element: <ResetInstructions />,
          },
        ],
      },
    ],
  },
  {
    path: "/project/dashboard",
    // element: <ProjectDashboardLayout />,
    element: <PrivateRoute isAuthenticated={isAuthenticated}><ProjectDashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/project/dashboard/project-info",
        element: <PrivateRoute isAuthenticated={isAuthenticated}><ProjectInformation /></PrivateRoute>,
        // element: <ProjectInformation />,
      },
      {
        path: "/project/dashboard/scope",
        // element: <Scope />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><Scope /></PrivateRoute>,

      },
      {
        path: "/project/dashboard/keychange",
        // element: <KeyChanges />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><KeyChanges /></PrivateRoute>,
        children: [
          {
            path: "/project/dashboard/keychange/objectives",
            element: <ObjectivesPage />,
            children: [
              // {
              //   path: "",
              //   element: <ObjectiveForm />,
              // },
              {
                path: "/project/dashboard/keychange/objectives/*",
                element: <ObjectiveForm />,
              },
              // {
              //   path: "/project/dashboard/keychange/objectives/3",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/4",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/5",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/6",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/7",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/8",
              //   element: <ObjectiveForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/objectives/9",
              //   element: <ObjectiveForm />,
              // },
            ],
          },
          {
            path: "/project/dashboard/keychange/key-impacts",
            element: <KeyImpactPage />,
            children: [
              {
                path: `/project/dashboard/keychange/key-impacts/*`,
                element: <KeyImpactForm />,
              },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/2",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/3",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/4",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/5",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/6",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/7",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/8",
              //   element: <KeyImpactForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/key-impacts/9",
              //   element: <KeyImpactForm />,
              // },
            ],
          },
          {
            path: "/project/dashboard/keychange/stakeholders",
            element: <StakeholdersPage />,
            children: [
              {
                path: "/project/dashboard/keychange/stakeholders/*",
                element: <StakeholderForm />,
              },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/2",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/3",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/4",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/5",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/6",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/7",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/8",
              //   element: <StakeholderForm />,
              // },
              // {
              //   path: "/project/dashboard/keychange/stakeholders/9",
              //   element: <StakeholderForm />,
              // },
            ],
          },
          {
            path: "",
            element: <KeyChangesPage />,
          },
          {
            path: "/project/dashboard/keychange/priority/",
            element: <PriorityPage />,
            children: [
              {
                path: "/project/dashboard/keychange/priority/*",
                element: <PriorityForm />,
              },
            ],
          },
          {
            path: "/project/dashboard/keychange/risks/*",
            element: <RiskPage />,
          },
        ],
      },
      {
        path: "/project/dashboard/changeapproach/",
        // element: <ChangeApproach />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><ChangeApproach /></PrivateRoute>,

      },
      {
        path: "/project/dashboard/cmmatrix",
        // element: <CmMatrix />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><CmMatrix /></PrivateRoute>,

      },
      {
        path: "/project/dashboard/budget",
        // element: <Budget />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><Budget /></PrivateRoute>,
        children: [
          {
            path: "/project/dashboard/budget/*",
            element: <BudgetForm />,
          },
          // {
          //   path: "/project/dashboard/budget/2",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/3",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/4",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/5",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/6",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/7",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/8",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/9",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/10",
          //   element: <BudgetForm />,
          // },
          // {
          //   path: "/project/dashboard/budget/11",
          //   element: <BudgetForm />,
          // },
        ],
      },
      {
        path: "/project/dashboard/keydates",
        element: <PrivateRoute isAuthenticated={isAuthenticated}><KeyDates /></PrivateRoute>,
        // element: <KeyDates />,
      },
      {
        path: "/project/dashboard/casechange",
        // element: <CaseChange />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><CaseChange /></PrivateRoute>,

      },
      {
        path: "/project/dashboard/transitioncurve",
        // element: <TransitionCurve />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><TransitionCurve /></PrivateRoute>,

      },
      {
        path: "/project/dashboard/riskregister",
        // element: <RiskRegister />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><RiskRegister /></PrivateRoute>,
        children: [
          {
            path: "/project/dashboard/riskregister/*",
            element: <RiskOne />,
          },
        ],
      },
      {
        path: "/project/dashboard/issueregister",
        // element: <IssueRegister />,
        element: <PrivateRoute isAuthenticated={isAuthenticated}><IssueRegister /></PrivateRoute>,

        children: [
          {
            path: "/project/dashboard/issueregister/*",
            element: <IssueOne />,
          },
        ],
      },
      {
        path: "/project/dashboard/decisionregister",
        element: <PrivateRoute isAuthenticated={isAuthenticated}><DecisionRegister /></PrivateRoute>,
      },
      {
        path: "/project/dashboard/lessons",
        element: <PrivateRoute isAuthenticated={isAuthenticated}><Lessons /></PrivateRoute>,

      },
    ],
  },
  {
    path: "/manager/dashboard/",
    element: <PrivateRoute isAuthenticated={isAuthenticated}><ManagerDashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <ManagerHome />,
      },
      {
        path: "/manager/dashboard/calendar",
        element: <Calendar />,
      },
      {
        path: "/manager/dashboard/projects",
        element: <ManagerProjects />,
      },
      {
        path: "/manager/dashboard/keydates",
        element: <ManagerKeyDates />,
      },
    ],
  },
  {
    path: "/executive/dashboard/",
    element: <PrivateRoute isAuthenticated={isAuthenticated}><ExecutiveDashboardLayout /></PrivateRoute>,

    children: [
      {
        path: "",
        element: <ExecutiveHome />,
      },
      {
        path: "/executive/dashboard/projects",
        element: <ExecutiveProjects />,
      },
      {
        path: "/executive/dashboard/calendar",
        element: <Calendar />,
      },
      {
        path: "/executive/dashboard/keydates",
        element: <ExecutiveKeyDate />,
      },
    ],
  },
]);

