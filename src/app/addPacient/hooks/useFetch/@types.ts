import { Pacient } from "../../../../@types";

export type UseFetch = {
  onSubmit: (data: Pacient) => Promise<any>;
  onRemove: (id: string | number) => Promise<any>;
  onUpdateF: (data: Pacient) => Promise<any>;
};
