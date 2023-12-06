import { Response, Users } from "../../@types";

export type UseUsers = {
  onSave: (data: Users) => Promise<Response>;
  onGet: () => Promise<Users[]>;
  onGetOne: (id: string) => Promise<Users[]>;
  onUpdate: (id: number, data: Partial<Users>) => Promise<Users | Response>;
  onDelete: (id: number) => Promise<Response>;
};
