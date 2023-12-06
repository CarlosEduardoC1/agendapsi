import { Text, View } from "react-native";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from '@expo/vector-icons';
import { Pressable, Image } from "react-native";
import { Divider, NativeBaseProvider } from "native-base";

const DEFAULT_IMAGE = Image.resolveAssetSource(require("../../../assets/hatching-chick.png")).uri;

export const About: React.FC = (): React.ReactElement => {
    const { setOptions, goBack } = useNavigation();

    useEffect(() => {
        setOptions({
            title: "Sobre",
            headerLeft: () => <Fontisto name="qrcode" size={18} style={{ marginLeft: 20 }} color="#E91E63" />,
            headerRight: () => <Pressable
                onPress={() => goBack()}>
                <Text style={{ color: "#E91E63", marginRight: 20 }}>
                    Fechar
                </Text>
            </Pressable>
        })
    }, []);

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <View className={styles["header-container"]}>
                    <View className={styles["header-container-image"]}>
                        <Image source={{ uri: DEFAULT_IMAGE }} width={50} height={50} resizeMode="contain" />
                    </View>
                    <Text className={styles["header-title"]}>Agenda Ninho</Text>
                </View>
                <View style={{ marginTop: 10 }} />
                <View className={styles["infos-container"]}>
                    <Text className={styles["infos-title"]}>Autor</Text>
                    <Text style={{ color: "#999" }}>ninhopsi.com.br</Text>
                </View>
                <Divider bg="gray.800" width={"97%"} />
                <View className={styles["infos-container"]}>
                    <Text className={styles["infos-title"]}>Compartilhar</Text>
                    <Text style={{ color: "#E91E63" }}>agendaninho.glideapp.io/</Text>
                </View>
                <Divider bg="gray.800" width={"97%"} />
            </NativeBaseProvider>
        </View>
    )
}