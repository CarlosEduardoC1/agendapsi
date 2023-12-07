import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import styles from "./styles.module.scss";
import { Divider } from '@rneui/themed';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../context/App";

export const DrawerContent: React.FC = ({ exit, user, logged }: any): React.ReactElement => {
    const { navigate } = useNavigation<any>();
    const { ActionTypes, dispatch } = GlobalContext();

    return (
        <DrawerContentScrollView className={styles["container"]}>
            <View>
                <Pressable onPress={() => {
                    if (user.length > 0 && user[0].email === "seuemail@mail.com") dispatch({
                        type: ActionTypes.SHOW_REGISTER_PAGE,
                        payload: true
                    })
                }}>
                    <MaterialCommunityIcons name="account-circle-outline" size={65} color="#E91E63" />
                    <Text className={styles["drawer-content-text"]}>{
                        logged && user.length > 0 ? user?.[0].nome : "Logar"}</Text>
                    {logged && user.length > 0 && <Text style={{ color: "#999" }}>{user?.[0].email}</Text>}
                </Pressable>
            </View>
            <Divider style={{ marginTop: 25 }} />
            <View className={styles["rest-pages"]}>
                <Pressable onPress={() => navigate("Profile")} className={styles["pages-redirect"]}>
                    <MaterialCommunityIcons name="head" size={35} color="white" />
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Seu perfil</Text>
                </Pressable>
                <View style={{ marginTop: 10 }} />
                <Pressable onPress={() => navigate("About")} className={styles["pages-redirect"]}>
                    <Ionicons name="ios-share" size={35} color="white" />
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Sobre</Text>
                </Pressable>
                <View style={{ marginTop: 10 }} />
                {logged && user.length > 0 && <Pressable onPress={() => exit(user[0])} className={styles["pages-redirect"]}>
                    <MaterialCommunityIcons name="exit-run" size={35} color="white" />
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Sair</Text>
                </Pressable>
                }
            </View>
        </DrawerContentScrollView>
    )
}