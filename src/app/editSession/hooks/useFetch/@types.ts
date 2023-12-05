import { Sessions } from "../../../../@types";

type Id = string | number;

export type UseFetch = {
  onGetSessions: (id: Id) => Promise<Sessions>;
  onDeleteSessions: (id: Id) => Promise<void>;
  onUpdateSessions: (id: Id, data: any) => Promise<void>;
};
