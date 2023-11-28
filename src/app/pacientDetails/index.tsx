import { Text, View, Pressable } from "react-native"
import styles from "./styles.module.scss";
import { useComponent } from "./hooks";
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Divider, NativeBaseProvider } from "native-base";
import { masks } from "../../utils";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pacient } from "../../@types";

type RootStackParamList = {
    PacientDetails: { pacient: Pacient };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PacientDetails'>;

export const PacientDetails: React.FC<Props> = ({ route }): React.ReactElement => {
    const { openLinking, newSession } = useComponent({ pacient: route.params.pacient });

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Text className={styles["name"]}>{route.params.pacient.nome}</Text>

                <View style={{ margin: 10 }} />
                <View className={styles["phone-container"]}>
                    <View>
                        <Text style={{ color: "#999999" }}>Telefone</Text>
                        <Text style={{ color: "white" }}>{masks.phoneMask(route.params.pacient.telefone)}</Text>
                    </View>
                    <Pressable className={styles["phone-icon"]} onPress={() => openLinking("tel", route.params.pacient.telefone)}>
                        <FontAwesome5 name="phone-alt" size={18} color="#E91E63" style={{ opacity: 1 }} />
                    </Pressable>
                </View>

                <View style={{ margin: 10 }} />
                <Pressable onPress={() => openLinking("mailto", route.params.pacient.email)}>
                    <Text style={{ color: "#6F7AC0" }}>{route.params.pacient.email}</Text>
                </Pressable>

                <View style={{ margin: 10 }} />
                <View>
                    <Text style={{ color: "#999999" }}>Valores em aberto</Text>
                    <Text> </Text>
                </View>
                <View style={{ display: "flex", marginRight: 10 }}>
                    <Button size="lg" variant="outline" colorScheme="secondary"
                        borderColor={"pink.800"}
                        borderRadius={10}
                        onPress={() => openLinking("whatsapp", route.params.pacient.telefone)}>
                        Enviar whatsapp
                    </Button>
                </View>
                <View style={{ margin: 10 }} />
                <Divider bg="gray.800" width={"97%"} />
                <Button size="lg" colorScheme="secondary"
                    borderColor={"pink.800"}
                    borderRadius={10}
                    style={{ marginRight: 10, marginTop: 10 }}
                    onPress={newSession}
                >
                    Adicionar sessão
                </Button>

            </NativeBaseProvider>
        </View>
    )
}
{/** ADICIONAR QUERY PARA BUSCAR VALORES ABERTOS */ }