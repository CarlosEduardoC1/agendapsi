import { Pacient, Sessions } from "../../../../@types"

export type UseFetch = {
    onGetPacient: (id: string) => Promise<Pacient>;
    onGetSession: (id: string) => Promise<Sessions>;
    onUpdateSession: (data: Sessions) => Promise<void>;
}