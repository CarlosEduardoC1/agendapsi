import { useCallback, useEffect, useState } from "react";
import { UseComponent } from "./@types";
import { State } from "../../@types";
import { INITIAL_STATE } from "../../config";
import { usePacient } from "../../../../hooks";

export const useComponent = (): UseComponent => {
  const [{ pacients, loading }, setState] = useState<State>(INITIAL_STATE);
  const { onGetAll } = usePacient();

  const getPacients = useCallback(async (): Promise<void> => {
    try {
      setLoading("show");
      const response = await onGetAll();
      setState((state) => ({
        ...state,
        pacients: response,
      }));
    } catch (error) {
      
    } finally {
      setLoading("hide");
    }
  }, []);

  useEffect(() => {
    getPacients();
  }, [getPacients]);

  function setLoading(mode: "show" | "hide"): void {
    setState((state) => ({
      ...state,
      loading: mode === "show",
    }));
  }
  return {
    pacients,
    loading,
  };
};
