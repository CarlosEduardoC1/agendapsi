import { Sessions } from "../../../../@types";

export type UseComponent = State & {
  setAlert: (mode: "show" | "hide") => void;
  deleteSession: () => Promise<void>;
  setDatePicker: (m: "open" | "close") => void;
  parseDate: (date: Date) => string;
};

export type State = {
  alert: boolean;
  sessions: Sessions | null;
  open_date_picker: boolean;
};

export interface Props {
  id: string | number;
  handleSubmit: any;
}
