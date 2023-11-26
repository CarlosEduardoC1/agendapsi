import { FormValues, List, Select } from "../../@types";

export interface Props {
  handleSubmit: any;
}

export type UseComponent = State & {
  setDatePicker: (mode: "open" | "close") => void;
  parseDate: (date: Date) => string;
  createNewSession: (data: FormValues) => void;
};

export type State = {
  pacient_list: List<Select>;
  open_date_picker: boolean;
};
