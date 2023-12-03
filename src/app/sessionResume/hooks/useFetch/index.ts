import { useCallback } from "react";
import { Pacient, Sessions } from "../../../../@types";
import { usePacient, useSession } from "../../../../hooks";
import { UseFetch } from "./@types";

export const useFetch = (): UseFetch => {
  const { onGetSingle } = usePacient();
  const { onGetSingle: onGetSingleSession, onUpdate } = useSession();

  const onGetPacient = useCallback(async (id: string): Promise<Pacient> => {
    try {
      return await onGetSingle(Number(id));
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetSession = useCallback(async (id: string): Promise<Sessions> => {
    try {
      return await onGetSingleSession(Number(id));
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onUpdateSession = useCallback(
    async (data: Sessions): Promise<void> => {
      try {
        const response = await onUpdate(Number(data.id), data);
        console.log("UPDATE RESPONSE", response);
      } catch (error) {
        console.log("UPDATE ERROR");
        throw new Error(JSON.stringify(error));
      }
    },
    []
  );

  return {
    onGetPacient,
    onGetSession,
    onUpdateSession
  };
};
