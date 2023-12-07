import { State } from "../hooks/useComponent/@types";

export const INITIAL_STATE: State = {
  mode: "list",
  loading: false,
  list: [],
  search: "",
};
