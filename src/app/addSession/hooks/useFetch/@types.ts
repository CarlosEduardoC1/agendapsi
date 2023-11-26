import { FormValues } from "../../@types"

export type UseFetch = {
    onSubmit: (data: FormValues) => Promise<any>;
}