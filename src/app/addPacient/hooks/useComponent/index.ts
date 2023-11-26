import { useCallback, useEffect } from "react";
import { UseComponent, Props } from "./@types";
import { Pacient } from "../../../../@types";
import { useFetch } from "../useFetch";
import { GlobalContext } from "../../../../context/App";

export const useComponent = ({ handleSubmit }: Props): UseComponent => {
  const { onSubmit } = useFetch();
  const { dispatch, ActionTypes } = GlobalContext();

  const createPacient = useCallback(async (data: Pacient) => {
    try {
      const response = await onSubmit(data);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: ActionTypes.ACTIVE_TAB_CALLBACK,
      payload: handleSubmit(createPacient),
    });

    return () => dispatch({ type: ActionTypes.REMOVE_TAB_CALLBACK });
  }, []);

  return {
    createPacient,
  };
};
