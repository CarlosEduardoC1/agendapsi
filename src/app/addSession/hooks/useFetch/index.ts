import { useCallback } from "react";
import { UseFetch } from "./@types";
import { FormValues } from "../../@types";

export const useFetch = (): UseFetch => {
  const onSubmit = useCallback(async (data: FormValues) => {
    console.log(data);
    return Promise.resolve(true);
  }, []);

  return {
    onSubmit,
  };
};
