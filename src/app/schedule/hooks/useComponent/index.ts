import { useEffect, useState } from "react";
import { State, UseComponent } from "./@types";
import { INITIAL_STATE } from "../../config";
import { Mode } from "../../../../@types";
import { useSession } from "../../../../hooks";
import { useIsFocused } from "@react-navigation/native";

import moment from "moment";
import "moment/locale/pt-br";
moment().locale("pt-br");

export const useComponent = (): UseComponent => {
  const [{ mode, list, loading, search }, setState] =
    useState<State>(INITIAL_STATE);
  const { onGetByPacientSearch } = useSession();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      try {
        setState((st) => ({
          ...st,
          loading: true,
        }));

        const response = await onGetByPacientSearch(search);
        const formated = (response as any).reduce(
          (
            catMemo: any,
            { schedule_date, id, id_paciente, nome }: any
          ) => {
            
            const asDate = moment(schedule_date)
              .format("LLLL")
              .replace(` às ${moment(schedule_date).format("HH:mm")}`, "");
            (catMemo[asDate] = catMemo[asDate] || []).push({
              pacientName: nome,
              sessionHour: String(moment(schedule_date).format("HH:mm")),
              id: id_paciente,
              sessionId: id,
            });
            return catMemo;
          },
          {}
        );
        setState((state) => ({
          ...state,
          list: formated,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setState((st) => ({
          ...st,
          loading: false,
        }));
      }
    })();
  }, [mode, isFocused, search]);

  function changeMode(mode: Mode) {
    setState((state) => ({
      ...state,
      mode,
    }));
  }

  function changeSearch(text: string) {
    setState((state) => ({
      ...state,
      search: text,
    }));
  }

  return {
    mode,
    changeMode,
    list,
    loading,
    search,
    changeSearch,
  };
};
