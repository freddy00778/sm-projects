export interface ChangeActivityProps {
  id: number;
  topTitle: string;
  activity: ActivityType[];
}

export type ActivityType = {
  id: number;
  title: string;
  type?: string;
  typeValue?: string;
  data: ChartData;
};
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string[];
  }>;
}
// export type ActivityData = {
//   label: string;
//   fill: boolean;
//   data: number[];
//   backgroundColors: ActivityColors[];
// };

// export type DataSet = {
//   labels: ActivityLabels[];
//   datasets: ActivityData[];
// };

// export type ActivityColors = {
//   id: number;
//   color: string;
// };

// export type ActivityLabels = {
//   id: number;
//   label: string;
// };
