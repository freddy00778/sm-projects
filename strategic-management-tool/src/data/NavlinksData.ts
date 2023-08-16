import { NavLinksProps } from "../models/NavLinks";
import home from "../assets/images/home.svg";
import project from "../assets/images/project-info.svg";
import scope from "../assets/images/scope.svg";
import keyChange from "../assets/images/key-change.svg";
import changeApproach from "../assets/images/change-approach.svg";
import cmMatrix from "../assets/images/cm-matrix.svg";
import budget from "../assets/images/budget.svg";
import caseChange from "../assets/images/case-for-change.svg";
import transitionCurve from "../assets/images/transition-curve.svg";
import riskRegister from "../assets/images/risk-register.svg";
import issueRegister from "../assets/images/issue-register.svg";
import decisionRegister from "../assets/images/decision-register.svg";
import lessons from "../assets/images/lessons.svg";
import date from "../assets/images/dates.svg";

export const NavLinksData: NavLinksProps[] = [
  {
    id: "1",
    title: "Home",
    image: home,
    route: "/project/dashboard",
  },
  {
    id: "2",
    title: "Project Information",
    image: project,
    route: "/project/dashboard/project-info",
  },
  {
    id: "3",
    title: "Scope",
    image: scope,
    route: "/project/dashboard/scope",
  },
  {
    id: "4",
    title: "Key Changes & Impact",
    image: keyChange,
    route: "/project/dashboard/keychange",
  },
  {
    id: "5",
    title: "Change Approach",
    image: changeApproach,
    route: "/project/dashboard/changeapproach",
  },
  {
    id: "6",
    title: "CM Activity & Matrix",
    image: cmMatrix,
    route: "/project/dashboard/cmmatrix",
  },
  {
    id: "7",
    title: "Budget",
    image: budget,
    route: "/project/dashboard/budget",
  },
  {
    id: "8",
    title: "Key Dates",
    image: date,
    route: "/project/dashboard/keydates",
  },
  {
    id: "9",
    title: "Case for Change",
    image: caseChange,
    route: "/project/dashboard/casechange",
  },
  {
    id: "10",
    title: "Transition Curve",
    image: transitionCurve,
    route: "/project/dashboard/transitioncurve",
  },
  {
    id: "11",
    title: "Risk Register",
    image: riskRegister,
    route: "/project/dashboard/riskregister",
  },
  {
    id: "12",
    title: "Issue Register",
    image: issueRegister,
    route: "/project/dashboard/issueregister",
  },
  {
    id: "13",
    title: "Decision Register",
    image: decisionRegister,
    route: "/project/dashboard/decisionregister",
  },
  {
    id: "14",
    title: "Lessons Learnt Log",
    image: lessons,
    route: "/project/dashboard/lessons",
  },
];
