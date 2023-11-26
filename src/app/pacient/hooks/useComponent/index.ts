import { useCallback, useEffect, useState } from "react";
import { UseComponent } from "./@types";
import { State } from "../../@types";
import { INITIAL_STATE } from "../../config";

export const useComponent = (): UseComponent => {
  const [{ pacients, loading }, setState] = useState<State>(INITIAL_STATE);

  const getPacients = useCallback(async (): Promise<void> => {
    try {
      setLoading("show");
      setState((state) => ({
        ...state,
        pacients: [
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
          {
            email: "tst",
            nome: "Carlos",
            telefone: "61995184278",
            valor: 560,
          },
        ],
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
