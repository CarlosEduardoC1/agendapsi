import { useCallback, useEffect, useState } from "react";
import { State, UseComponent } from "./@types";
import { INITIAL_STATE } from "../../config";
import { Mode } from "../../../../@types";
import { usePacient, useSession } from "../../../../hooks";
import { Props as List } from "../../../../components/List/@types";
import dayjs from "dayjs";

export const useComponent = (): UseComponent => {
  const [{ mode, list, loading }, setState] = useState<State>(INITIAL_STATE);
  const { onGetAll } = useSession();
  const { onGetSingle } = usePacient();

  useEffect(() => {
    (async () => {
      try {
        setState((st) => ({
          ...st,
          loading: true,
        }));

        const result: List[] = [];
        const { data } = await onGetAll();
        if (data) {
          for (let i = 0; i < data?.length; i++) {
            const pacient = await onGetSingle(data[i].id_paciente);
            if (pacient.nome) {
              result.push({
                date: dayjs(data[i].schedule_date).format(
                  mode === "list" ? "LLLL" : "YYYY-MM-DD HH:mm:ss"
                ),
                content: [],
              });
            }
          }
        }
        console.log(result);
        // setState((st) => ({
        //   ...st,
        //   list: result,
        // }));
      } catch (error) {
      } finally {
        setState((st) => ({
          ...st,
          loading: false,
        }));
      }
    })();
  }, [mode]);

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
