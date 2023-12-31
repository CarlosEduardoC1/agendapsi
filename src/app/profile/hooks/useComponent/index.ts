import { useIsFocused, useNavigation } from "@react-navigation/native";
import { State, UseComponent, Props } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import { Users } from "../../../../@types";

export const useComponent = ({ image }: Props): UseComponent => {
  const { setOptions, goBack, navigate } = useNavigation<any>();
  const [{ user }, setState] = useState<State>(INITIAL_STATE);
  const { createUser, onGetUser, updateUser } = useFetch();
  const isFocused = useIsFocused();

  const getUser = useCallback(async () => {
    const response = await onGetUser();

    if (response.length > 0) {
      setState((state) => ({
        ...state,
        user: response[0],
      }));
    }
  }, [image]);

  const handleSubmit = useCallback(async (data: Users) => {
    if (data.id) {
      await updateUser(data);
    } else {
      await createUser(data);
    }
  }, []);

  useEffect(() => {
    setOptions({
      ...OPTIONS(
        () => goBack(),
        () => navigate("EditProfile", { id: String(user.id) })
      ),
    });
    getUser();
  }, [getUser, isFocused]);

  return { user, handleSubmit };
};
