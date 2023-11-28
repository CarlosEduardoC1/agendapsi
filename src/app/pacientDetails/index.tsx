import { Text, View, Pressable } from "react-native"
import styles from "./styles.module.scss";
import { useComponent } from "./hooks";
import { GlobalContext } from "../../context/App";
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Divider, NativeBaseProvider } from "native-base";
import { masks } from "../../utils";

export const PacientDetails: React.FC = (): React.ReactElement => {
    const { state } = GlobalContext();
    const { openLinking, newSession } = useComponent({ id: String(state.editPacientName.id) });


    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Text className={styles["name"]}>{state.editPacientName.nome}</Text>

                <View style={{ margin: 10 }} />
                <View className={styles["phone-container"]}>
                    <View>
                        <Text style={{ color: "#999999" }}>Telefone</Text>
                        <Text style={{ color: "white" }}>{masks.phoneMask(state.editPacientName.telefone)}</Text>
                    </View>
                    <Pressable className={styles["phone-icon"]} onPress={() => openLinking("tel", state.editPacientName.telefone)}>
                        <FontAwesome5 name="phone-alt" size={18} color="#E91E63" style={{ opacity: 1 }} />
                    </Pressable>
                </View>

                <View style={{ margin: 10 }} />
                <Pressable onPress={() => openLinking("mailto", state.editPacientName.email)}>
                    <Text style={{ color: "#0000EE" }}>{state.editPacientName.email}</Text>
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
                        onPress={() => openLinking("whatsapp", state.editPacientName.telefone)}>
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