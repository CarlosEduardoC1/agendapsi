import { Users } from "../../../../@types"

export type UseFetch = {
    createUser: (data: Users) => Promise<void>;
    updateUser: (data: Users) => Promise<void>;
    onGetUser: () => Promise<Users[]>;
}