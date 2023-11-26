import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import { GlobalContext } from "../../../context/App";

type ScreenNames = ["Agenda", "Paciente", "Financeiro"];
type ScreenNamesRecorded = Record<ScreenNames[number], undefined>

export const ADD_PACIENT_OPTIONS = (): DrawerNavigationOptions => {
    const nav = useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();
    const { state } = GlobalContext();
    return {
        title: "",
        headerLeft: () => <Pressable onPress={() => nav.navigate("Paciente")}><Text style={{ color: "#E91E63", marginLeft: 20 }}>Cancelar</Text></Pressable>,
        headerRight: () => <Pressable onPress={() => state.onPressActiveTab()}><Text style={{ color: "#E91E63", marginRight: 20 }}>Adicionar</Text></Pressable>
    }
}