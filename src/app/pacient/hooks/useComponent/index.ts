import { useCallback, useEffect, useState } from "react";
import { UseComponent } from "./@types";
import { State } from "../../@types";
import { INITIAL_STATE } from "../../config";
import { usePacient } from "../../../../hooks";
import { useIsFocused} from "@react-navigation/native";

export const useComponent = (): UseComponent => {
  const [{ pacients, loading, search }, setState] = useState<State>(INITIAL_STATE);
  const { onGetBySearch } = usePacient();
  const isFocused = useIsFocused();

  const getPacients = useCallback(async (): Promise<void> => {
    try {
      setLoading("show");
      const response = await onGetBySearch(search);
      setState((state) => ({
        ...state,
        pacients: response,
      }));
    } catch (error) {
    } finally {
      setLoading("hide");
    }
  }, [search]);

  useEffect(() => {
    getPacients();
  }, [getPacients, isFocused]);

  function setLoading(mode: "show" | "hide"): void {
    setState((state) => ({
      ...state,
      loading: mode === "show",
    }));
  }

  function changeSearch(text: string) {
    setState((state) => ({
      ...state,
      search: text,
    }));
  }

  return {
    pacients,
    loading,
    changeSearch,
    search
  };
};
