import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Props, State, UseComponent } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import { Users } from "../../../../@types";

export const useComponent = ({ id, handleSubmit }: Props): UseComponent => {
  const { setOptions, goBack } = useNavigation();
  const [{ user }, setState] = useState<State>(INITIAL_STATE);
  const { get, set } = useFetch();
  const isFocused = useIsFocused();

  const getUser = useCallback(async () => {
    const response = await get(id);

    if (response.length > 0) {
      setState((state) => ({
        ...state,
        user: response[0],
      }));
    }
  }, [id]);

  const onSubmit = useCallback(async (data: Users) => {
    await set(id, data);
    goBack();
  }, []);

  useEffect(() => {
    setOptions({
      ...OPTIONS(goBack, handleSubmit(onSubmit)),
    });
    getUser();
  }, [getUser, isFocused]);

  return { user };
};
