import { Mode, Sessions } from "../../../../@types";

export interface Props {
  pacient_id: string;
}

export type UseComponent = State & {
  changeMode: (mode: Mode) => void;
};

export type State = {
  mode: Mode;
  list: Sessions[];
  loading: boolean;
};
