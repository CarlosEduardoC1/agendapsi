import { useCallback } from "react";
import { UseFetch } from "./@types";
import { useSession } from "../../../../hooks";

export const useFetch = (): UseFetch => {
  const { onGetByPacient } = useSession();

  const getSessions = useCallback(async (id: string) => {
    const response = await onGetByPacient(id);
    return response;
  }, []);

  return {
    getSessions,
  };
};
