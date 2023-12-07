import { Mode, Schedule } from "../../../../@types";
import { Props as List } from "../../../../components/List/@types";

export type UseComponent = State & {
  changeMode: (mode: Mode) => void;
  changeSearch: (t: string) => void;
};

export type State = {
  mode: Mode;
  list: any;
  loading: boolean;
  search: string;
};
