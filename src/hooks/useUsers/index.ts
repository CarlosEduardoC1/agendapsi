import { useCallback, useMemo } from "react";
import { UseUsers } from "./@types";
import { Response, Users } from "@/@types";
import Querys from "../../service/querys";

export const useUsers = (): UseUsers => {
  const query = useMemo(() => new Querys("users"), []);

  const onSave = useCallback(async (data: Users): Promise<Response> => {
    try {
      const id = await query.insertation(data);
      console.log(id);
      return {
        status: 200,
        message: "Usuário criado com sucesso.",
      };
    } catch (error) {
      return { status: 400, message: "Erro ao tentar criar usuário" };
    }
  }, []);

  const onGetSingle = useCallback(
    async (id: number): Promise<Users | Response> => {
      try {
        const single = await query.findOne(id);
        return single[0];
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível encontrar os dados do usuário.",
        };
      }
    },
    []
  );

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

  return { onSave, onGetSingle, onUpdate, onDelete };
};
