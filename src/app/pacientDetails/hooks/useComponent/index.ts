import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Linking } from "react-native";
import { SupportedModes, UseComponent, Props } from "./@types";
import { OPTIONS } from "./config";

type ScreenNames = ["AddPacient", "AddSession", "Paciente"];
type ScreenNamesRecorded = Record<ScreenNames[number], any>;

export const useComponent = ({ pacient }: Props): UseComponent => {
  const { navigate, setOptions } =
    useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();

  useEffect(() => {
    setOptions({
      ...OPTIONS(
        () => navigate("Paciente"),
        () => {
          navigate("AddPacient", {
            isEditable: true,
            pacient,
          });
        },
        pacient.nome
      ),
    });

    return () => {};
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

  return {
    openLinking,
    newSession,
  };
};
