import { useCallback } from "react";
import { UseFetch } from "./@types";
import { useUsers } from "../../../../hooks/useUsers";
import { Users } from "../../../../@types";

export const useFetch = (): UseFetch => {
  const { onGet, onSave, onUpdate } = useUsers();

  const onGetUser = useCallback(async () => {
    try {
      const user = await onGet();
      return user;
    } catch (error) {
      throw new Error("Não foi possível encontrar os dados do usuário");
    }
  }, []);

  const createUser = useCallback(async (data: Users) => {
    try {
      await onSave(data);
    } catch (error) {
      throw new Error("Não foi possível cadastrar o usuário");
    }
  }, []);

  const updateUser = useCallback(async (data: Users) => {
    try {
      if (data.id) {
        const result = await onUpdate(Number(data.id), data);
        console.log(result);
      } else {
        throw new Error("Não foi possível atualizar o usuário");
      }
    } catch (error) {
      throw new Error("Não foi possível atualizar o usuário");
    }
  }, []);

  return { createUser, onGetUser, updateUser };
};
