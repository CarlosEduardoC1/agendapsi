import { Pacient } from "../../../../@types";

export interface Props {
  handleSubmit: any;
  isEditable: boolean;
}

export type State = {
  alert: boolean;
};

export type UseComponent = State & {
  createPacient: (data: Pacient) => void;
  setAlert: (mode: "show" | "hide") => void;
  dropPacient: (id: string | number) => void;
};
