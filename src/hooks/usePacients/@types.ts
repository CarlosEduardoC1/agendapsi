import { Pacient, Response } from "../../@types";

export type UsePacient = {
  onSave: (data: Pacient) => Promise<Response>;
  onGetAll: () => Promise<Pacient[]>;
  onGetSingle: (id: number) => Promise<Pacient | Response>;
  onUpdate: (id: number, data: Partial<Pacient>) => Promise<Pacient | Response>;
  onDelete: (id: number) => Promise<Response>;
};
