import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import styles from "./styles.module.scss";
import { Divider } from '@rneui/themed';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

export const DrawerContent: React.FC = (): React.ReactElement => {
    const { navigate } = useNavigation<any>();
    return (
        <DrawerContentScrollView className={styles["container"]}>
            <View>
                <Pressable>
                    <MaterialCommunityIcons name="account-circle-outline" size={65} color="#E91E63" />
                    <Text className={styles["drawer-content-text"]}>Logar</Text>
                </Pressable>
            </View>
            <Divider style={{ marginTop: 25 }} />
            <View className={styles["rest-pages"]}>
                <Pressable onPress={() => navigate("Profile")} className={styles["pages-redirect"]}>
                    <MaterialCommunityIcons name="head" size={35} color="white" />
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Seu perfil</Text>
                </Pressable>
                <Pressable onPress={() => navigate("About")} className={styles["pages-redirect"]}>
                    <Ionicons name="ios-share" size={35} color="white" />
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Sobre</Text>
                </Pressable>

            </View>
        </DrawerContentScrollView>
    )
}