import { useCallback, useEffect, useState } from "react";
import { State, UseComponent, Props } from "./@types";
import { INITIAL_STATE } from "./config";
import dayjs from "dayjs";
import { FormValues } from "../../@types";
import { useFetch } from "../useFetch";
import { GlobalContext } from "../../../../context/App";

export const useComponent = ({ handleSubmit }: Props): UseComponent => {
  const [{ pacient_list, open_date_picker }, setState] =
    useState<State>(INITIAL_STATE);
  const { onSubmit } = useFetch();
  const { ActionTypes, dispatch } = GlobalContext();

  const createNewSession = useCallback(async (data: FormValues) => {
    try {
      const response = await onSubmit(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const getPacients = useCallback(async () => {
    try {
      setState((state) => ({
        ...state,
        pacient_list: [
          { label: "Carlos", value: "1" },
          { label: "Carlos 1", value: "2" },
          { label: "Carlos 2", value: "3" },
          { label: "Carlos 3", value: "4" },
          { label: "Carlos 4", value: "5" },
          { label: "Carlos 5", value: "6" },
          { label: "Carlos 6", value: "7" },
        ],
      }));
    } catch (error) {
      throw new Error(String(error));
    }
  }, []);

  useEffect(() => {
    getPacients();
    dispatch({
      type: ActionTypes.ACTIVE_TAB_CALLBACK,
      payload: handleSubmit(createNewSession, (error: any) =>
        console.log(error)
      ),
    });

    return () => dispatch({ type: ActionTypes.REMOVE_TAB_CALLBACK });
  }, [getPacients]);

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
