import { RiskProps } from "../models/Risk";

export const RiskData: RiskProps[] = [
  {
    id: "1",
    topTitle: "Risk Summary",
    title: "Risk Category",
    total: "Total",
    riskContent: [
      {
        id: "1",
        value: "Highly Intolerable",
        number: 0,
        color: "#F21212",
        textColor: "#ffffff",
      },
      {
        id: "2",
        value: "Intolerable",
        number: 0,
        color: "#FF715E",
        textColor: "#ffffff",
      },
      {
        id: "3",
        value: "ALARP",
        number: 0,
        color: "#FF9900",
        textColor: "#ffffff",
      },
      {
        id: "4",
        value: "Maintain",
        number: 0,
        color: "#FFC700",
        textColor: "#000",
      },
      {
        id: "5",
        value: "",
        number: 0,
      },
    ],
  },
  {
    id: "2",
    topTitle: "Issue Summary",
    title: "Issue Classification",
    total: "Total",
    riskContent: [
      {
        id: "1",
        value: "Very High Impact",
        number: 0,
        color: "#5912F2",
        textColor: "#ffffff",
      },
      {
        id: "2",
        value: "High Impact",
        number: 0,
        color: "#6B5EFF",
        textColor: "#ffffff",
      },
      {
        id: "3",
        value: "Medium Impact",
        number: 0,
        color: "#00A3FF",
        textColor: "#ffffff",
      },
      {
        id: "4",
        value: "Low Impact",
        number: 0,
        color: "#00FF66",
        textColor: "#000",
      },
      {
        id: "5",
        value: "",
        number: 0,
      },
    ],
  },
  {
    id: "3",
    title: "Top 3 Risks",
    riskContent: [
      // {
      //   id: "1",
      //   value: "Risk 1",
      // },
      // {
      //   id: "2",
      //   value: "Risk 2",
      // },
      // {
      //   id: "3",
      //   value: "Risk 3",
      // },
    ],
  },
  {
    id: "4",
    title: "Top 3 Issues",
    riskContent: [
      // {
      //   id: "1",
      //   value: "Issue 1",
      // },
      // {
      //   id: "2",
      //   value: "Issue 2",
      // },
      // {
      //   id: "3",
      //   value: "Issue 3",
      // },
    ],
  },
  {
    id: "5",
    title: "Last 3 Project Decisions Made",
    riskContent: [
      // {
      //   id: "1",
      //   value: "Decision 1",
      // },
      // {
      //   id: "2",
      //   value: "Decision 2",
      // },
      // {
      //   id: "3",
      //   value: "Decision 3",
      // },
    ],
  },
];
