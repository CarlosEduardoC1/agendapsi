import { useCallback } from "react";
import { UseFetch } from "./@types";
import { Pacient } from "../../../../@types";
import { usePacient } from "../../../../hooks";

export const useFetch = (): UseFetch => {
  const { onSave, onUpdate, onDelete } = usePacient();

  const onSubmit = useCallback(async (data: Pacient): Promise<any> => {
    const formData = { ...data };
    formData.telefone = formData.telefone.replace(/\D/g, "");
    return await onSave(formData);
  }, []);

  const onRemove = useCallback(async (id: string | number): Promise<any> => {
    return await onDelete(Number(id));
  }, []);

  const onUpdateF = useCallback(async (data: Pacient): Promise<any> => {
    const formData = { ...data };
    formData.telefone = formData.telefone.replace(/\D/g, "");
    return await onUpdate(Number(formData.id), formData);
  }, []);

  return {
    onSubmit,
    onRemove,
    onUpdateF
  };
};
