import { Pacient, Sessions } from "../../../../@types";

export type UseFetch = {
    onSubmit: (data: Sessions) => Promise<any>;
    getPacients: () => Promise<Pacient[]>;
}