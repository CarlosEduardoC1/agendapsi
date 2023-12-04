import { useCallback, useEffect, useState } from "react";
import { ChartData, State, UseComponent } from "./@types";
import { INITIAL_STATE } from "./config";
import { useFetch } from "../useFetch";
import { getLastsSixMonths, defaultChartData } from "./utils";

export const useComponent = (): UseComponent => {
  const [{ chartData, oppenedSessions }, setState] =
    useState<State>(INITIAL_STATE);
  const { onGetReceived, onGetToReceive, onGetNotPayed } = useFetch();

  const lastSixMonths = getLastsSixMonths();

  const getChartData = useCallback(async () => {
    let allArr: ChartData[] = [];

    for (let i = 0; i < lastSixMonths.length; i++) {
      const received = await onGetReceived(lastSixMonths[i]);
      const toReceive = await onGetToReceive(lastSixMonths[i]);

      allArr.push(
        {
          ...defaultChartData,
          label: lastSixMonths[i],
          value: received.length > 0 ? Number(received[0].valor) : 0,
          frontColor: "#F0C9AF",
        },
        {
          value: toReceive.length > 0 ? Number(toReceive[0].valor) : 0,
          frontColor: "#7690B6",
        }
      );
    }

    setState((state) => ({
      ...state,
      chartData: allArr,
    }));
  }, []);

  const getOppenedSessions = useCallback(async () => {
    const oppened = await onGetNotPayed();
    setState((state) => ({
      ...state,
      oppenedSessions: oppened,
    }));
  }, []);

  useEffect(() => {
    getChartData();
    getOppenedSessions();
  }, [getChartData, getOppenedSessions]);

  return { chartData, oppenedSessions };
};
