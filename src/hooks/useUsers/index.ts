import { useCallback, useMemo } from "react";
import { UseUsers } from "./@types";
import { Response, Users } from "../../@types";
import Querys from "../../service/querys";

export const useUsers = (): UseUsers => {
  const query = useMemo(() => new Querys("users"), []);

  const onSave = useCallback(async (data: Users): Promise<Response> => {
    try {
      await query.insertation(data);
      return {
        status: 200,
        message: "Usuário criado com sucesso.",
      };
    } catch (error) {
      return { status: 400, message: "Erro ao tentar criar usuário" };
    }
  }, []);

  const onGet = useCallback(async (): Promise<Users[]> => {
    try {
      const single = await query.findAll<Users[]>();
      return single;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetOne = useCallback(async (id: string): Promise<Users[]> => {
    try {
      const single = await query.findOne<Users[]>(Number(id));
      return single;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onUpdate = useCallback(
    async (id: number, data: Partial<Users>): Promise<Response> => {
      try {
        await query.update(id, data);
        return {
          status: 200,
          message: "Usuário atualizado com sucesso",
        };
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível atualizar o usuário.",
        };
      }
    },
    []
  );

  const onDelete = useCallback(async (id: number): Promise<Response> => {
    try {
      await query.delete(id);
      return {
        status: 200,
        message: "Usuário deletado com sucesso",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Não foi possível deletar o usuário.",
      };
    }
  }, []);

  return { onSave, onGet, onUpdate, onDelete, onGetOne };
};
