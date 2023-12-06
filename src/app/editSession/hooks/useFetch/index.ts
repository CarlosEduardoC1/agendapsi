import { useCallback } from "react";
import { UseFetch } from "./@types";
import { useSession } from "../../../../hooks";

export const useFetch = (): UseFetch => {
  const { onDelete, onGetSingle, onUpdate } = useSession();

  const onUpdateSessions = useCallback(
    async (id: string | number, data: any) => {
      try {
        await onUpdate(Number(id), data);
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    },
    []
  );

  const onDeleteSessions = useCallback(async (id: string | number) => {
    try {
      await onDelete(Number(id));
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetSessions = useCallback(async (id: string | number) => {
    try {
      const response = await onGetSingle(Number(id));
      return response;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  return { onDeleteSessions, onGetSessions, onUpdateSessions };
};
