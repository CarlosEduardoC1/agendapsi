import { useCallback } from "react";
import { UseFetch } from "./@types";
import { useUsers } from "../../../../hooks/useUsers";
import { Users } from "../../../../@types";

export const useFetch = (): UseFetch => {
  const { onGetOne, onUpdate } = useUsers();
  const get = useCallback(async (id: string) => {
    try {
      return await onGetOne(id);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const set = useCallback(async (id: string, data: Users) => {
    try {
      await onUpdate(Number(id), data);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  return { get, set };
};
