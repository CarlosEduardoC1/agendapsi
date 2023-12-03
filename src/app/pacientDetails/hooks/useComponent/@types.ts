import { Pacient } from "../../../../@types";

export interface Props {
  pacient: Pacient
}

export type UseComponent = {
  newSession: () => void;
  oppenedValues: any
  sessionsQuantity: any
  navigateToReport: () => void;
};
