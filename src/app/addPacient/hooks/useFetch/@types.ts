import { Pacient } from "../../../../@types"

export type UseFetch = {
    onSubmit: (data: Pacient) => Promise<any>;
}