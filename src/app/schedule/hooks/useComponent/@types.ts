import { Mode, Schedule } from "../../../../@types";
import { Props as List } from "../../../../components/List/@types";

export type UseComponent = State & {
  changeMode: (mode: Mode) => void;
};

export type State = {
  mode: Mode;
  list: Schedule<List>;
  loading: boolean;
};
