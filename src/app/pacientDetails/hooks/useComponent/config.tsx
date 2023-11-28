import { Entypo, Foundation } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export const OPTIONS = (leftPress: any, rightPress: any, nome: string) => {
    return {
        title: nome,
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
            <Foundation name="pencil" size={20} color="#E91E63" style={{ marginRight: 10 }} />
        </Pressable>
    }
}