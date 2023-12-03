import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import { Props, State, UseComponent } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import { Mode } from "../../../../@types";
import { useNavigation } from "@react-navigation/native";

export const useComponent = ({ pacient_id }: Props): UseComponent => {
  const [{ list, loading, mode }, setState] = useState<State>(INITIAL_STATE);
  const { getSessions } = useFetch();
  const { setOptions, goBack } = useNavigation();

  const handleGetSessions = useCallback(async () => {
    try {
      const response = await getSessions(pacient_id);
      setState((state) => ({
        ...state,
        list: response,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetSessions();
    handleChangeOptions();
  }, [handleGetSessions]);

  function handleChangeOptions() {
    setOptions({
      ...OPTIONS(
        () => goBack(),
        () => console.log("FILTER")
      ),
    });
  }

  function changeMode(mode: Mode) {
    setState((state) => ({
      ...state,
      mode,
    }));
  }

  return {
    list,
    loading,
    mode,
    changeMode,
  };
};
