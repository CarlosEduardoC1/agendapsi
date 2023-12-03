import { useCallback, useEffect, useState } from "react";
import { State, UseComponent, Props } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import dayjs from "dayjs";
import { FormValues } from "../../@types";
import { useFetch } from "../useFetch";
import { handleSessionValues } from "./utils";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../../context/App";

export const useComponent = ({ handleSubmit }: Props): UseComponent => {
  const [{ pacient_list, open_date_picker }, setState] =
    useState<State>(INITIAL_STATE);
  const { onSubmit, getPacients } = useFetch();
  const { navigate, setOptions, goBack } = useNavigation<any>();
  const { ActionTypes, dispatch } = GlobalContext();

  const createNewSession = useCallback(async (data: FormValues) => {
    try {
      console.log("CALLED");
      const formValues = handleSessionValues(data);
      const response = await onSubmit(formValues);
      console.log(response);
      navigate("Agenda");
      dispatch({
        type: ActionTypes.ACTIVE_TAB,
        payload: "schedule",
      });
    } catch (error) {
      console.log(error);
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetPacients = useCallback(async () => {
    try {
      const pacients = await getPacients();
      setState((state) => ({
        ...state,
        pacient_list: pacients.map((i) => ({
          label: i.nome,
          value: String(i.id),
        })),
      }));
    } catch (error) {
      throw new Error(String(error));
    }
  }, []);

  useEffect(() => {
    onGetPacients();
    setOptions({
      ...OPTIONS(
        () => goBack(),
        handleSubmit(createNewSession, (error: any) =>
          console.log("ERRRRRO", error)
        )
      ),
    });
  }, [onGetPacients]);

  function setDatePicker(mode: "open" | "close"): void {
    setState((state) => ({
      ...state,
      open_date_picker: mode === "open",
    }));
  }

  function parseDate(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
  }

  return {
    pacient_list,
    open_date_picker,
    setDatePicker,
    parseDate,
    createNewSession,
  };
};
