import { State } from "./@types";
import { Pressable, Text } from "react-native";

export const INITIAL_STATE: State = {
  pacient_list: [],
  open_date_picker: false
};

export const OPTIONS = (clickLeft: any, clickRight: any) => {
  return {
    title: "",
    headerLeft: () => (
      <Pressable onPress={clickLeft}>
        <Text style={{ color: "#E91E63", marginLeft: 20 }}>Cancelar</Text>
      </Pressable>
    ),
    headerRight: () => (
      <Pressable onPress={clickRight}>
        <Text style={{ color: "#E91E63", marginRight: 20 }}>Adicionar</Text>
      </Pressable>
    ),
  };
};
