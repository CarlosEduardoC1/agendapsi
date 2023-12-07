import { Months, Response, SessionMode, Sessions } from "../../@types";

export type UseSession = {
  onSave: (data: Sessions) => Promise<Response>;
  onGetAll: () => Promise<Sessions[]>;
  onGetSingle: (id: number) => Promise<Sessions>;
  onUpdate: (id: number, data: Partial<Sessions>) => Promise<Response>;
  onDelete: (id: number) => Promise<Response>;
  onGetByPacient: (id: string) => Promise<Sessions[]>;
  onGetOnlyValuesByMonth: (month: Months, mode: SessionMode) => Promise<any>;
  onGetOppened: () => Promise<Sessions[]>;
  onGetByPacientSearch: (t: string) => Promise<any>;
};
