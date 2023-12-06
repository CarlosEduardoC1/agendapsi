import { Users } from "../../../../@types";

export type UseComponent = State

export interface Props {
  id: string;
  handleSubmit: any;
}

export type State = {
  user: Users | null;
};
