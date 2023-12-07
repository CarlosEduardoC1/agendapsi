import { Pacient } from "../../../@types";

export type State = {
  pacients: Pacient[];
  loading: boolean;
  search: string;
};
