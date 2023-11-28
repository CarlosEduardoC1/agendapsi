import { Pressable, Text, View } from "react-native";
import styles from "./styles.module.scss";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../../context/App";
import { Pacient } from "../../../../@types";

interface Props {
    pacient: Pacient
};

export const List: React.FC<Props> = ({ pacient }): React.ReactElement => {
    const { navigate }: any = useNavigation();
    const { ActionTypes, dispatch } = GlobalContext();

    function handleClick(): void {
        dispatch({
            type: ActionTypes.EDIT_PACIENT_NAME,
            payload: pacient
        });

        navigate("PacientDetails");
    }

    return (
        <Pressable onPress={handleClick}>
            <View className={styles["container"]} style={{ borderBottomColor: "gray", borderBottomWidth: 0.2 }}>
                <Text className={styles["primary-text"]}>{pacient.nome}</Text>
                <View className={styles["secondary-container"]}>
                    <Text className={styles["secondary-text"]}>{pacient.telefone}</Text>
                    <Entypo name="chevron-right" size={24} color="gray" />
                </View>
            </View>
        </Pressable>
    );
}