import { Response, Sessions } from "@/@types";

export type UseSession = {
  onSave: (data: Sessions) => Promise<Response>;
  onGetAll: () => Promise<Sessions[] | Response>;
  onGetSingle: (id: number) => Promise<Sessions | Response>;
  onUpdate: (id: number, data: Partial<Sessions>) => Promise<Sessions | Response>;
  onDelete: (id: number) => Promise<Response>;
};
