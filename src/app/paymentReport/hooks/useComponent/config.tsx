import { Pressable, Text } from "react-native";
import { State } from "./@types";
import { Entypo, AntDesign } from "@expo/vector-icons";

export const INITIAL_STATE: State = {
    list: [],
    loading: false,
    mode: "list",
    openFilter: false,
    filter: ""
};

export const OPTIONS = (leftPress: any, rightPress: any) => {
    return {
        title: 'Relatório de pagamento',
        headerLeft: () => <Pressable
            onPress={leftPress}
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
            onPress={rightPress}>
            <AntDesign name="filter" size={20} color="#E91E63" style={{ marginRight: 10 }} />
        </Pressable>
    }
}