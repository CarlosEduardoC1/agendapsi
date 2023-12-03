import { useCallback, useMemo } from "react";
import { UsePacient } from "./@types";
import { Pacient, Response } from "../../@types";
import Querys from "../../service/querys";

export const usePacient = (): UsePacient => {
  const query = useMemo(() => new Querys("pacient"), []);

  const onSave = useCallback(async (data: Pacient): Promise<string> => {
    try {
      await query.insertation(data);
      return "Paciente cadastrado com sucesso.";
    } catch (error) {
      throw new Error("Erro ao tentar cadastrar paciente");
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

  const onGetSingle = useCallback(async (id: number): Promise<Pacient> => {
    try {
      const single = await query.findOne<Pacient[]>(id);
      return single[0];
    } catch (error) {
      throw new Error("Nenhum paciente encontrado");
    }
  }, []);

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

  const onGetValues = useCallback(async (id: any) => {
    try {
      const values = await query.getPacientWithOppenedValues(id);
      return values;
    } catch (error) {
      throw new Error("Não encontrado");
    }
  }, []);

  const onGetSessionsQuantity = useCallback(async (id: any) => {
    try {
      const values = await query.pacientSessionsQuantity(id);
      return values;
    } catch (error) {
      throw new Error("Não encontrado");
    }
  }, []);

  return {
    onSave,
    onGetAll,
    onGetSingle,
    onUpdate,
    onDelete,
    onGetValues,
    onGetSessionsQuantity,
  };
};
