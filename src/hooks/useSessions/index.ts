import { useCallback, useMemo } from "react";
import { UseSession } from "./@types";
import { Response, Sessions } from "../../@types";
import Querys from "../../service/querys";

export const useSession = (): UseSession => {
  const query = useMemo(() => new Querys("sessions"), []);

  const onSave = useCallback(async (data: Sessions): Promise<any> => {
    try {
      const id = await query.insertation(data);
      return id;
    } catch (error) {
      throw new Error("Nenhuma sessão encontrada");
    }
  }, []);

  const onGetAll = useCallback(async (): Promise<Sessions[]> => {
    try {
      const rows = await query.findAll<Sessions[]>();
      return rows;
    } catch (error) {
      throw new Error("Nenhuma sessão encontrada");
    }
  }, []);

  const onGetSingle = useCallback(
    async (id: number): Promise<Response<Sessions>> => {
      try {
        const single = await query.findOne<Sessions>(id);
        return {
          status: 200,
          message: "",
          data: single,
        };
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível encontrar os dados da sessão.",
        };
      }
    },
    []
  );

  const onUpdate = useCallback(
    async (id: number, data: Partial<Sessions>): Promise<Response> => {
      try {
        await query.update(id, data);
        return {
          status: 200,
          message: "Sessão atualizada com sucesso",
        };
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível atualizar a sessão.",
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
        message: "Sessão deletada com sucesso",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Não foi possível deletar a sessão.",
      };
    }
  }, []);

  const onGetByPacient = useCallback(async (id: string): Promise<Sessions[]> => {
    try {
      const response = await query.getSessionByPacient<Sessions>(id);
      return response;
    } catch (error) {
      throw new Error("Nenhum dado encontrado");
    }
  }, []);

  return { onSave, onGetAll, onGetSingle, onUpdate, onDelete, onGetByPacient };
};
