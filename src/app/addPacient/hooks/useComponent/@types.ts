import { Pacient } from "../../../../@types"

export interface Props {
    handleSubmit: any;
}

export type UseComponent = {
    createPacient: (data: Pacient) => void;
}