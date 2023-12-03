import { Linking } from "react-native";
import { SupportedModes } from "../../@types";

export function openLinking(mode: SupportedModes, url: string) {
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
