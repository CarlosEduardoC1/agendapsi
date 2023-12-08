import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import { Props, State, UseComponent } from "./@types";
import { INITIAL_STATE, OPTIONS } from "./config";
import { Mode } from "../../../../@types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";

export const useComponent = ({ pacient_id }: Props): UseComponent => {
  const [{ list, loading, mode, openFilter, filter }, setState] =
    useState<State>(INITIAL_STATE);
  const { getSessions } = useFetch();
  const { setOptions, goBack } = useNavigation();
  const isFocused = useIsFocused();

  const handleGetSessions = useCallback(async () => {
    try {
      const response = await getSessions(pacient_id);

      const formated = (response as any).reduce(
        (catMemo: any, { schedule_date, payed, id, id_paciente }: any) => {
          const asDate = moment(schedule_date)
            .format("LLLL")
            .replace(` às ${moment(schedule_date).format("HH:mm")}`, "");
          (catMemo[asDate] = catMemo[asDate] || []).push({
            pacientName: payed ? "recebido" : "a receber",
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
    }
  }, [pacient_id]);

  useEffect(() => {
    handleGetSessions();
    handleChangeOptions();
  }, [handleGetSessions, isFocused]);

  function handleChangeOptions() {
    setOptions({
      ...OPTIONS(
        () => goBack(),
        () => handleFilter(true)
      ),
    });
  }

  function changeMode(mode: Mode) {
    setState((state) => ({
      ...state,
      mode,
    }));
  }

  function handleFilter(open: boolean) {
    setState((state) => ({
      ...state,
      openFilter: open,
    }));
  }

  function setFilter(selected: string) {
    setState((state) => ({
      ...state,
      filter: selected,
    }));
  }

  return {
    list,
    loading,
    mode,
    changeMode,
    openFilter,
    handleFilter,
    filter,
    setFilter
  };
};
