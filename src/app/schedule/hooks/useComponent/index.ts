import { useEffect, useState } from "react";
import { State, UseComponent } from "./@types";
import { INITIAL_STATE } from "../../config";
import { Mode } from "../../../../@types";
import { usePacient, useSession } from "../../../../hooks";
import { Props as List } from "../../../../components/List/@types";
import { useIsFocused } from "@react-navigation/native";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
dayjs.locale("pt-br");

export const useComponent = (): UseComponent => {
  const [{ mode, list, loading }, setState] = useState<State>(INITIAL_STATE);
  const { onGetAll } = useSession();
  const { onGetSingle } = usePacient();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      try {
        setState((st) => ({
          ...st,
          loading: true,
        }));

        const result: List[] = [];
        const response = await onGetAll();
        if (response) {
          for (let i = 0; i < response?.length; i++) {
            const pacient = await onGetSingle(response[i].id_paciente);
            dayjs(response[i].schedule_date).format(
              mode === "list" ? "LLLL" : "YYYY-MM-DD HH:mm:ss"
            );
            if (pacient.nome) {
              result.push({
                date: String(response[i].schedule_date),
                sessionId: String(response[i].id),
                content: [
                  {
                    id: String(pacient.id),
                    pacientName: pacient.nome,
                    sessionHour: String(response[i].schedule_date),
                  },
                ],
              });
            }
          }
        }
        setState((state) => ({
          ...state,
          list: result,
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
  }, [mode, isFocused]);

  function changeMode(mode: Mode) {
    setState((state) => ({
      ...state,
      mode,
    }));
  }

  return {
    mode,
    changeMode,
    list,
    loading,
  };
};
