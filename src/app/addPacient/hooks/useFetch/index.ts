import { useCallback } from "react";
import { UseFetch } from "./@types";
import { Pacient } from "../../../../@types";

export const useFetch = (): UseFetch => {
  const onSubmit = useCallback(async (data: Pacient): Promise<any> => {
    console.log(data);
    return Promise.resolve(true);
  }, []);

  const onRemove = useCallback(async (id: string | number): Promise<any> => {
    return Promise.resolve(true);
  }, []);

  return {
    onSubmit,
    onRemove
  };
};
