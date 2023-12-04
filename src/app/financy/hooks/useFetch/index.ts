import { useCallback } from "react";
import { UseFetch } from "./@types";
import { useSession } from "../../../../hooks";
import { Months, Sessions } from "../../../../@types";

export const useFetch = (): UseFetch => {
  const { onGetOnlyValuesByMonth, onGetOppened } = useSession();

  const onGetReceived = useCallback(async (month: Months) => {
    try {
      const response = await onGetOnlyValuesByMonth(month, "received");
      return response;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetToReceive = useCallback(async (month: Months) => {
    try {
      const response = await onGetOnlyValuesByMonth(month, "toreceive");
      return response;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  const onGetNotPayed = useCallback(async (): Promise<Sessions[]> => {
    try {
      const response = await onGetOppened();
      return response;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  return {
    onGetReceived,
    onGetToReceive,
    onGetNotPayed
  };
};
