import { ChangeActivityProps } from "../models/ChangeActivity";

export const ChangeActivityData: ChangeActivityProps[] = [
  {
    id: 1,
    topTitle: "Number of Projects per Level of Change Activity",
    activity: [
      {
        id: 1,
        title: "Strategic Change ",
        type: "Total Strategic",
        typeValue: "26",
        data: {
          labels: ["Very High", "High", "Medium", "Low"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#03D2FF"],
            },
          ],
        },
      },
      {
        id: 2,
        title: "BAU Change ",
        type: "Total BAU",
        typeValue: "11",
        data: {
          labels: ["Very High", "High", "Medium", "Low"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#03D2FF"],
            },
          ],
        },
      },
      {
        id: 3,
        title: "Corporate/Others ",
        type: "Total Corporate/Others",
        typeValue: "14",
        data: {
          labels: ["Very High", "High", "Medium", "Low"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#03D2FF"],
            },
          ],
        },
      },
      {
        id: 4,
        title: "Total ",
        type: "Total Projects",
        typeValue: "51",
        data: {
          labels: ["Very High", "High", "Medium", "Low"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#03D2FF"],
            },
          ],
        },
      },
    ],
  },
];
