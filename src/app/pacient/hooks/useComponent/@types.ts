import { State } from "../../@types";

export type UseComponent = State & {
  changeSearch: (t: string) => void;
};
