import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import { GlobalContext } from "../../../context/App";
import { Foundation, Entypo } from '@expo/vector-icons';

type ScreenNames = ["Agenda", "Paciente", "Financeiro"];
type ScreenNamesRecorded = Record<ScreenNames[number], undefined>

export const PACIENT_DETAILS_OPTIONS = (): DrawerNavigationOptions => {
    const nav = useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();
    const { state } = GlobalContext();
    return {
        title: state.editPacientName.nome,
        headerLeft: () => <Pressable
            onPress={() => nav.navigate("Paciente")}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
            <Entypo name="chevron-thin-left" size={24} color="#E91E63" />
            <Text style={{ color: "#E91E63", marginLeft: 20 }}>
                Voltar
            </Text>
        </Pressable>,
        headerRight: () => <Pressable
            onPress={() => state.onPressActiveTab()}>
            <Foundation name="pencil" size={20} color="#E91E63" style={{ marginRight: 10 }} />
        </Pressable>
    }
}