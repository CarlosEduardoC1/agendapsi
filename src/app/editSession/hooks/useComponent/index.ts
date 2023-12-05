import { useNavigation } from "@react-navigation/native";
import { Props, State, UseComponent } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { handleSessionValues } from "./utils";
import { useFetch } from "../useFetch";

export const useComponent = ({ handleSubmit, id }: Props): UseComponent => {
  const [{ alert, sessions, open_date_picker }, setState] =
    useState<State>(INITIAL_STATE);
  const { goBack, setOptions } = useNavigation<any>();
  const { onDeleteSessions, onGetSessions, onUpdateSessions } = useFetch();

  const updateSession = useCallback(async (data: any) => {
    const form = handleSessionValues(data);
    await onUpdateSessions(id, form);
    goBack();
  }, []);

  const deleteSession = useCallback(async () => {
    setAlert("hide");
    await onDeleteSessions(id);
    goBack();
  }, []);

  const getSessions = useCallback(async () => {
    const response = await onGetSessions(id);
    setState((state) => ({
      ...state,
      sessions: response,
    }));
  }, [id]);

  useEffect(() => {
    setOptions({
      ...OPTIONS(() => goBack(), handleSubmit(updateSession)),
    });
    getSessions();
  }, [getSessions]);

  function setAlert(mode: "show" | "hide"): void {
    setState((state) => ({
      ...state,
      alert: mode === "show",
    }));
  }

  function setDatePicker(mode: "open" | "close") {
    setState((state) => ({
      ...state,
      open_date_picker: mode === "open",
    }));
  }

  function parseDate(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
  }

  return {
    alert,
    setAlert,
    deleteSession,
    sessions,
    open_date_picker,
    setDatePicker,
    parseDate,
  };
};