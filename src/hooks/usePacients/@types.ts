import { Pacient, Response } from "../../@types";

export type UsePacient = {
  onSave: (data: Pacient) => Promise<string>;
  onGetAll: () => Promise<Pacient[]>;
  onGetSingle: (id: number) => Promise<Pacient>;
  onUpdate: (id: number, data: Partial<Pacient>) => Promise<Pacient | Response>;
  onDelete: (id: number) => Promise<Response>;
  onGetValues: (id: any) => Promise<any>;
  onGetSessionsQuantity: (id: any) => Promise<any>;
  onGetBySearch: (t: string) => Promise<any>;
};
