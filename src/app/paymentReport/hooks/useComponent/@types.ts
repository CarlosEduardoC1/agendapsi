import { Mode, Sessions } from "../../../../@types";

export interface Props {
  pacient_id: string;
}

export type UseComponent = State & {
  changeMode: (mode: Mode) => void;
  handleFilter: (mode: boolean) => void;
  setFilter: (s: string) => void;
};

export type State = {
  mode: Mode;
  list: Sessions[];
  loading: boolean;
  openFilter: boolean;
  filter: string;
};
