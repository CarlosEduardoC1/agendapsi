import { useCallback, useEffect, useState } from "react";
import { UseComponent, Props, State } from "./@types";
import { Pacient } from "../../../../@types";
import { useFetch } from "../useFetch";
import { GlobalContext } from "../../../../context/App";
import { INITIAL_STATE } from "./config";
import { useNavigation } from "@react-navigation/native";
import { usePacient } from "../../../../hooks";

export const useComponent = ({
  handleSubmit,
  isEditable,
}: Props): UseComponent => {
  const [{ alert }, setState] = useState<State>(INITIAL_STATE);
  const { onRemove } = useFetch();
  const { dispatch, ActionTypes } = GlobalContext();
  const { navigate } = useNavigation<any>();
  const { onSave } = usePacient();

  const createPacient = useCallback(async (data: Pacient) => {
    try {
      const response = await onSave(data);
      console.log(response.data);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const dropPacient = useCallback(async (id: string | number) => {
    try {
      const response = await onRemove(id);
      navigate("Paciente");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    if (!isEditable) {
      dispatch({
        type: ActionTypes.ACTIVE_TAB_CALLBACK,
        payload: handleSubmit(createPacient),
      });
    }
    return () => dispatch({ type: ActionTypes.REMOVE_TAB_CALLBACK });
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
