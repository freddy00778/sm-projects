export type RiskContent = {
  id: string;
  value: string;
  number?: number | string;
  color?: string;
  textColor?: string;
};

export type ChangeContent = {
  id: string;
  department?: string;
  affected?: number;
  driver?: number;
};
export interface RiskProps {
  id: string;
  topTitle?: string;
  titleColor?: string;
  title?: string;
  total?: string;
  name?: string;
  value?: string;
  riskContent?: RiskContent[];
}

export interface ChangeProps {
  id: string;
  department?: string;
  affectedDepartment?: string;
  changeDriver?: string;
  affectedColor?: string;
  driverColor?: string;
  changeContent?: ChangeContent[];
}
