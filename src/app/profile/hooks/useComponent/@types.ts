import { Users } from "../../../../@types";

export type UseComponent = State & {
    handleSubmit: (data: Users) => Promise<void>;
};

export type State = {
  user: Users;
};

export interface Props {
    image?: string;
}