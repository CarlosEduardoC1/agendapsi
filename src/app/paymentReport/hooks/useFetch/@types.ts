import { Sessions } from "../../../../@types";

export type UseFetch = {
  getSessions: (id: string) => Promise<Sessions[]>;
};
