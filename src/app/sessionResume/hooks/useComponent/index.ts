import { useCallback, useEffect, useState } from "react";
import { Props, State, UseComponent } from "./@types";
import { useFetch } from "../useFetch";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export const useComponent = ({ id, sessionId }: Props): UseComponent => {
  const [{ pacientData, sessionData }, setState] =
    useState<State>(INITIAL_STATE);
  const { setOptions, goBack, navigate } = useNavigation<any>();
  const { onGetPacient, onGetSession } = useFetch();
  const isFocused = useIsFocused();

  const getPacient = useCallback(async () => {
    const response = await onGetPacient(id);
    setState((state) => ({
      ...state,
      pacientData: response,
    }));
  }, [id, isFocused]);
  
  const getSessions = useCallback(async () => {
    const response = await onGetSession(sessionId);
    console.log(response);
    setState((state) => ({
      ...state,
      sessionData: response,
    }));
  }, [sessionId, isFocused]);

  useEffect(() => {
    getPacient();
    getSessions();
    updateOptions();
  }, [getPacient, getSessions]);

  function updateOptions() {
    setOptions({
      ...OPTIONS(
        () => goBack(),
        () => navigate("EditSession", { sessionId })
      ),
    });
  }

  return {
    pacientData,
    sessionData,
  };
};
