import { Pressable, Text } from "react-native"
import { State } from "./@types"

export const INITIAL_STATE: State = {
    user: null
}

export const OPTIONS = (leftPress: any, rightPress: any) => {
    return {
        title: '',
        headerLeft: () => <Pressable
            onPress={leftPress}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
            <Text style={{ color: "#E91E63", marginLeft: 20 }}>
                Cancelar
            </Text>
        </Pressable>,
        headerRight: () => <Pressable
            onPress={rightPress}>
            <Text style={{ color: "#E91E63", marginRight: 20 }}>
                Fechar
            </Text>
        </Pressable>
    }
}