import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import { GlobalContext } from "../../context/App";

export const ADD_SESSION_OPTIONS = (): DrawerNavigationOptions => {
    const nav = useNavigation();
    const { state } = GlobalContext();
    return {
        title: "",
        headerLeft: () => <Pressable onPress={() => nav.goBack()}><Text style={{ color: "#E91E63", marginLeft: 20 }}>Cancelar</Text></Pressable>,
        headerRight: () => <Pressable onPress={() => state.onPressActiveTab()}><Text style={{ color: "#E91E63", marginRight: 20 }}>Adicionar</Text></Pressable>
    }
}