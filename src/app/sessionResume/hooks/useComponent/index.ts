import { useCallback, useEffect, useState } from "react";
import { Props, State, UseComponent } from "./@types";
import { useFetch } from "../useFetch";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useNavigation } from "@react-navigation/native";

export const useComponent = ({ id, sessionId }: Props): UseComponent => {
  const [{ pacientData, sessionData }, setState] =
    useState<State>(INITIAL_STATE);
  const { setOptions, goBack } = useNavigation<any>();
  const { onGetPacient, onGetSession } = useFetch();

  const getPacient = useCallback(async () => {
    const response = await onGetPacient(id);
    setState((state) => ({
      ...state,
      pacientData: response,
    }));
  }, [id]);

  const getSessions = useCallback(async () => {
    const response = await onGetSession(sessionId);
    setState((state) => ({
      ...state,
      sessionData: response,
    }));
  }, [sessionId]);

  useEffect(() => {
    getPacient();
    getSessions();
    updateOptions();
  }, [getPacient, getSessions]);

  function updateOptions() {
    setOptions({
      ...OPTIONS(
        () => goBack(),
        () => console.log("HANDLE EDIT")
      ),
    });
  }

  return {
    pacientData,
    sessionData,
  };
};
