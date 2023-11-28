import { useEffect } from "react";
import { GlobalContext } from "../../../../context/App";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Linking } from "react-native";
import { SupportedModes, UseComponent, Props } from "./@types";

type ScreenNames = ["AddPacient", "AddSession"];
type ScreenNamesRecorded = Record<ScreenNames[number], any>;

export const useComponent = ({ id }: Props): UseComponent => {
  const { dispatch, ActionTypes, state } = GlobalContext();
  const { navigate } =
    useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();

  useEffect(() => {
    dispatch({
      type: ActionTypes.ACTIVE_TAB_CALLBACK,
      payload: () =>
        navigate("AddPacient", {
          isEditable: true,
          pacient: state.editPacientName,
        }),
    });
    return () =>
      dispatch({
        type: ActionTypes.EDIT_PACIENT_NAME,
        payload: { email: "", nome: "", telefone: "", valor: "" },
      });
  }, []);

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
    navigate("AddSession", { hasPacient: true, pacient: String(id) });
  }

  return {
    openLinking,
    newSession,
  };
};
