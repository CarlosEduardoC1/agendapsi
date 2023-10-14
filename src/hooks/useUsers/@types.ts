import { Response, Users } from "@/@types";

export type UseUsers = {
  onSave: (data: Users) => Promise<Response>;
  onGetSingle: (id: number) => Promise<Users | Response>;
  onUpdate: (id: number, data: Partial<Users>) => Promise<Users | Response>;
  onDelete: (id: number) => Promise<Response>;
};
