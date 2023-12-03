import { useCallback, useEffect, useState } from "react";
import { UseComponent, Props, State } from "./@types";
import { Pacient } from "../../../../@types";
import { useFetch } from "../useFetch";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../../context/App";

export const useComponent = ({
  handleSubmit,
  isEditable,
}: Props): UseComponent => {
  const [{ alert }, setState] = useState<State>(INITIAL_STATE);
  const { onRemove, onSubmit, onUpdateF } = useFetch();
  const { navigate, setOptions } = useNavigation<any>();
  const { ActionTypes, dispatch } = GlobalContext();

  const createPacient = useCallback(async (data: Pacient) => {
    try {
      await onSubmit(data);
      navigate("Paciente");
      dispatch({
        type: ActionTypes.ACTIVE_TAB,
        payload: "pacient"
      })
    } catch (error) {}
  }, []);

  const dropPacient = useCallback(async (id: string | number) => {
    try {
      await onRemove(id);
      navigate("Paciente");
      dispatch({
        type: ActionTypes.ACTIVE_TAB,
        payload: "pacient"
      })
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const editPacient = useCallback(async (data: Pacient) => {
    try {
      await onUpdateF(data);
      navigate("Paciente");
      dispatch({
        type: ActionTypes.ACTIVE_TAB,
        payload: "pacient"
      })
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    setOptions({
      ...OPTIONS(
        () => navigate("Paciente"),
        handleSubmit(isEditable ? editPacient : createPacient)
      ),
    });
  }, []);

  function setAlert(mode: "show" | "hide"): void {
    setState((state) => ({
      ...state,
      alert: mode === "show",
    }));
  }

  return {
    createPacient,
    setAlert,
    alert,
    dropPacient,
  };
};
