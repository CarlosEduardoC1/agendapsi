import { useCallback, useMemo } from "react";
import { UseSession } from "./@types";
import { Response, Sessions } from "../../@types";
import Querys from "../../service/querys";

export const useSession = (): UseSession => {
  const query = useMemo(() => new Querys("sessions"), []);

  const onSave = useCallback(async (data: Sessions): Promise<Response<any>> => {
    try {
      const id = await query.insertation(data);
      return {
        status: 200,
        message: "Sessão criada com sucesso.",
        data: id,
      };
    } catch (error) {
      return {
        status: 400,
        message: "Erro ao tentar criar sessão"
      };
    }
  }, []);

  const onGetAll = useCallback(async (): Promise<Response<Sessions[]>> => {
    try {
      const rows = await query.findAll();
      console.log("RIYTS", rows);
      return { status: 200, message: "", data: rows };
    } catch (error) {
      return {
        status: 400,
        message: "Nenhuma sessão encontrada"
      };
    }
  }, []);

  const onGetSingle = useCallback(
    async (id: number): Promise<Response<Sessions>> => {
      try {
        const single = await query.findOne(id);
        return {
          status: 200,
          message: "",
          data: single[0],
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

  return { onSave, onGetAll, onGetSingle, onUpdate, onDelete };
};
