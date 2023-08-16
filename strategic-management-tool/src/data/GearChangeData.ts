import { ChangeActivityProps } from "../models/ChangeActivity";

export const GearChangeData: ChangeActivityProps[] = [
  {
    id: 1,
    topTitle: "Number of Project Per Gear",
    activity: [
      {
        id: 1,
        title: "Start-Up Phase ",
        data: {
          labels: ["Gear 1", "Gear 2", "Gear 3", "Gear 4"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#0057FF"],
            },
          ],
        },
      },
      {
        id: 2,
        title: "Implementation Phase ",
        data: {
          labels: ["Gear 1", "Gear 2", "Gear 3", "Gear 4"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#0057FF"],
            },
          ],
        },
      },
      {
        id: 3,
        title: "Anchoring Phase ",
        data: {
          labels: ["Gear 1", "Gear 2", "Gear 3", "Gear 4"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#0057FF"],
            },
          ],
        },
      },
      {
        id: 4,
        title: "Total Across All Phases ",
        data: {
          labels: ["Gear 1", "Gear 2", "Gear 3", "Gear 4"],
          datasets: [
            {
              label: "Data",
              fill: true,
              data: [50, 25, 15, 10],
              backgroundColor: ["#AE02FF", "#1CFD17", "#FF1F00", "#0057FF"],
            },
          ],
        },
      },
    ],
  },
];
