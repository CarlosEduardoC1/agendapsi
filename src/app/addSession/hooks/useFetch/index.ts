import { useCallback } from "react";
import { UseFetch } from "./@types";
import { usePacient, useSession } from "../../../../hooks";
import { Pacient, Sessions } from "../../../../@types";

export const useFetch = (): UseFetch => {
  const { onGetAll } = usePacient();
  const { onSave } = useSession();

  const onSubmit = useCallback(async (data: Sessions): Promise<any> => {
    console.log("SUBMIT");
    const response = await onSave(data);
    console.log(response);
    return response;
  }, []);

  const getPacients = useCallback(async (): Promise<Pacient[]> => {
    return await onGetAll();
  }, []);

  return {
    onSubmit,
    getPacients,
  };
};
