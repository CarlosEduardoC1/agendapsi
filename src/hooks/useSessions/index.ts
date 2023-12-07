import { useCallback, useMemo } from "react";
import { UseSession } from "./@types";
import { Months, Response, SessionMode, Sessions } from "../../@types";
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

  const onGetSingle = useCallback(async (id: number): Promise<Sessions> => {
    try {
      const result = await query.findOne<Sessions[]>(id);
      return result[0];
    } catch (error) {
      throw new Error("Nenhuma sessão encontrada");
    }
  }, []);

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

  const onGetByPacient = useCallback(
    async (id: string): Promise<Sessions[]> => {
      try {
        const response = await query.getSessionByPacient<Sessions>(id);
        return response;
      } catch (error) {
        throw new Error("Nenhum dado encontrado");
      }
    },
    []
  );

  const onGetOnlyValuesByMonth = useCallback(
    async (month: Months, mode: SessionMode) => {
      try {
        const response = await query.getSessionByValues(month, mode);
        return response;
      } catch (error) {
        throw new Error("Nenhum dado encontrado");
      }
    },
    []
  );

  const onGetOppened = useCallback(async (): Promise<Sessions[]> => {
    try {
      const response = await query.getSessionsOpen();
      return response;
    } catch (error) {
      throw new Error("Nenhum dado encontrado");
    }
  }, []);

  const onGetByPacientSearch = useCallback(
    async (text: string): Promise<any> => {
      try {
        const response = await query.getSessionByPacientName(text);
        return response;
      } catch (error) {
        throw new Error("Nenhum dado encontrado");
      }
    },
    []
  );

  return {
    onSave,
    onGetAll,
    onGetSingle,
    onUpdate,
    onDelete,
    onGetByPacient,
    onGetOnlyValuesByMonth,
    onGetOppened,
    onGetByPacientSearch
  };
};
