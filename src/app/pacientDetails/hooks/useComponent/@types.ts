import { Pacient } from "../../../../@types";

export interface Props {
  pacient: Pacient
}

export type SupportedModes = "tel" | "mailto" | "whatsapp";

export type UseComponent = {
  openLinking: (mode: SupportedModes, url: string) => void;
  newSession: () => void;
  oppenedValues: any
  sessionsQuantity: any
  navigateToReport: () => void;
};
