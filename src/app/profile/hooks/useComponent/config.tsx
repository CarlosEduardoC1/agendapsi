import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { Pressable, Text } from "react-native"
import { State } from "./@types"

export const INITIAL_STATE: State = {
    user: {
        email: "seuemail@mail.com",
        nome: "Seu Nome"
    }
}

export const OPTIONS = (leftPress: any, rightPress: any) => {
    return {
        title: 'Seu perfil',
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
            <MaterialCommunityIcons name="pencil" size={20} color="#E91E63" style={{ marginRight: 10 }} />
        </Pressable>
    }
}