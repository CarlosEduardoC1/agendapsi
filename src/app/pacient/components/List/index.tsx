import { Pressable, Text, View } from "react-native";
import styles from "./styles.module.scss";
import { Entypo } from '@expo/vector-icons';

interface Props {
    nome?: string;
    telefone?: string;
}

export const List: React.FC<Props> = ({ nome, telefone }): React.ReactElement => {
    return (
        <Pressable onPress={() => alert("test")}>
            <View className={styles["container"]} style={{ borderBottomColor: "gray", borderBottomWidth: 0.2 }}>
                <Text className={styles["primary-text"]}>{nome}</Text>
                <View className={styles["secondary-container"]}>
                    <Text className={styles["secondary-text"]}>{telefone}</Text>
                    <Entypo name="chevron-right" size={24} color="gray" />
                </View>
            </View>
        </Pressable>
    );
}