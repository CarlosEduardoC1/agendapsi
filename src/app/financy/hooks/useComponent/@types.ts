import { Months, Sessions } from "../../../../@types";

export type UseComponent = {
  chartData: ChartData[];
  oppenedSessions: Sessions[];
  handleRedirect: (id: string, sId: string) => void;
};

export type ChartData = {
  value: number;
  frontColor: string;
  label?: Months;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: { color: string };
};

export type State = {
  chartData: ChartData[];
  oppenedSessions: Sessions[];
};
