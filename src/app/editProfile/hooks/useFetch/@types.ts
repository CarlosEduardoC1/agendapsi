import { Users } from "../../../../@types";

export type UseFetch = {
  get: (id: string) => Promise<Users[]>;
  set: (id: string, data: Users) => Promise<void>;
};
