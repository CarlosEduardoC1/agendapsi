import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Linking } from "react-native";
import { SupportedModes, UseComponent, Props } from "./@types";
import { OPTIONS } from "./config";
import { GlobalContext } from "../../../../context/App";
import { usePacient } from "../../../../hooks";

type ScreenNames = ["AddPacient", "AddSession", "Paciente", "PaymentReport"];
type ScreenNamesRecorded = Record<ScreenNames[number], any>;

export const useComponent = ({ pacient }: Props): UseComponent => {
  const { navigate, setOptions } =
    useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();
  const { ActionTypes, dispatch } = GlobalContext();
  const { onGetValues, onGetSessionsQuantity } = usePacient();
  const [oppenedValues, setOppenedValues] = useState();
  const [sessionsQuantity, setSessionsQuantity] = useState<number>();

  const getOppenedValues = useCallback(async () => {
    const values = await onGetValues(pacient.id);
    if (values.length > 0) {
      setOppenedValues(values[0].soma);
    } else {
      setOppenedValues(undefined);
    }
  }, [pacient.id]);

  const getSessionsQuantity = useCallback(async () => {
    const values = await onGetSessionsQuantity(pacient.id);
    if (values.length > 0) {
      setSessionsQuantity(values[0].quantidade);
    } else {
      setSessionsQuantity(undefined);
    }
  }, [pacient.id]);

  useEffect(() => {
    setOptions({
      ...OPTIONS(
        () => {
          navigate("Paciente");
          dispatch({
            type: ActionTypes.ACTIVE_TAB,
            payload: "pacient",
          });
        },
        () => {
          navigate("AddPacient", {
            isEditable: true,
            pacient,
          });
        },
        pacient.nome
      ),
    });
    getOppenedValues();
    getSessionsQuantity();
  }, [pacient]);

  function openLinking(mode: SupportedModes, url: string) {
    if (mode === "whatsapp") {
      Linking.canOpenURL(`whatsapp://send?phone=${url}`).then((can) => {
        if (can) {
          Linking.openURL(`whatsapp://send?phone=${url}`);
        }
      });
    } else {
      Linking.openURL(`${mode}:${url}`);
    }
  }

  function newSession() {
    navigate("AddSession", { hasPacient: true, pacient: String(pacient.id) });
  }

  function navigateToReport() {
    navigate("PaymentReport", { pacient_id: pacient.id });
  }

  return {
    openLinking,
    newSession,
    oppenedValues,
    sessionsQuantity,
    navigateToReport
  };
};
