import { useCallback, useEffect, useState } from "react";
import { UseComponent, Props, State } from "./@types";
import { Pacient } from "../../../../@types";
import { useFetch } from "../useFetch";
import { INITIAL_STATE, OPTIONS } from "./config";
import { useNavigation } from "@react-navigation/native";

export const useComponent = ({
  handleSubmit,
  isEditable,
}: Props): UseComponent => {
  const [{ alert }, setState] = useState<State>(INITIAL_STATE);
  const { onRemove, onSubmit, onUpdateF } = useFetch();
  const { navigate, setOptions } = useNavigation<any>();

  const createPacient = useCallback(async (data: Pacient) => {
    try {
      await onSubmit(data);
      navigate("Paciente");
    } catch (error) {}
  }, []);

  const dropPacient = useCallback(async (id: string | number) => {
    try {
      await onRemove(id);
      navigate("Paciente");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const editPacient = useCallback(async (data: Pacient) => {
    try {
      await onUpdateF(data);
      navigate("Paciente");
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
