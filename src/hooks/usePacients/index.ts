import { useCallback, useMemo } from "react";
import { UsePacient } from "./@types";
import { Pacient, Response } from "../../@types";
import Querys from "../../service/querys";

export const usePacient = (): UsePacient => {
  const query = useMemo(() => new Querys("pacient"), []);

  const onSave = useCallback(async (data: Pacient): Promise<Response> => {
    try {
      const id = await query.insertation(data);
      return {
        status: 200,
        message: "Paciente cadastrado com sucesso." + " " + id,
      };
    } catch (error) {
      return { status: 400, message: "Erro ao tentar cadastrar paciente" };
    }
  }, []);

  const onGetAll = useCallback(async (): Promise<Pacient[]> => {
    try {
      const rows = await query.findAll<Pacient[]>();
      return rows;
    } catch (error) {
      throw new Error("Nenhum paciente encontrado");
    }
  }, []);

  const onGetSingle = useCallback(
    async (id: number): Promise<Pacient | Response> => {
      try {
        const single = await query.findOne<Pacient>(id);
        return single;
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível encontrar o paciente.",
        };
      }
    },
    []
  );

  const onUpdate = useCallback(
    async (id: number, data: Partial<Pacient>): Promise<Response> => {
      try {
        await query.update(id, data);
        return {
          status: 200,
          message: "Paciente atualizado com sucesso",
        };
      } catch (error) {
        return {
          status: 400,
          message: "Não foi possível atualizar o paciente.",
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
        message: "Paciente atualizado com sucesso",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Não foi possível atualizar o paciente.",
      };
    }
  }, []);

  return { onSave, onGetAll, onGetSingle, onUpdate, onDelete };
};
