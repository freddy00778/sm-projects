import { NavLinksProps } from "../models/NavLinks";
import home from "../assets/images/home.svg";
import project from "../assets/images/project-info.svg";
import calendar from "../assets/images//nav-calendar.svg";
import date from "../assets/images/dates.svg";

export const ManagerNavlinksData: NavLinksProps[] = [
  {
    id: "1",
    title: "Home",
    image: home,
    route: "/manager/dashboard",
  },
  {
    id: "2",
    title: "Calendar",
    image: calendar,
    route: "/manager/dashboard/calendar",
  },
  {
    id: "3",
    title: "Projects",
    image: project,
    route: "/manager/dashboard/projects",
  },
  {
    id: "4",
    title: "Key Dates",
    image: date,
    route: "/manager/dashboard/keydates",
  },
];
