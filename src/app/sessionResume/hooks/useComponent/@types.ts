import { Pacient, Sessions } from "../../../../@types";

export interface Props {
    id: string;
    sessionId: string;
    renderLeft?: any
}

export type UseComponent = State & {
}

export type State = {
    pacientData: Pacient | null;
    sessionData: Sessions | null;
}