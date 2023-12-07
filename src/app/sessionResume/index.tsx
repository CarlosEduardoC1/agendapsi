import { Pressable, Text, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useComponent, useCustomForm } from "./hooks";
import styles from "./styles.module.scss";
import { Divider, NativeBaseProvider, Button, } from "native-base";
import { masks, openLinking } from "../../utils";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

type RootStackParamList = {
    SessionResume: { id: string, sessionId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SessionResume'>;

export const SessionResume: React.FC<Props> = ({ route }): React.ReactElement => {
    const { pacientData, sessionData } = useComponent({ ...route.params });
    const { renderForm } = useCustomForm({ sessionData });
    
    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <View>
                    <Text style={{ color: "#999999" }}>Paciente</Text>
                    <Text style={{ color: "white" }}>{pacientData?.nome}</Text>
                </View>

                <View style={{ margin: 10 }} />

                <View>
                    <Text style={{ color: "#999999" }}>Valor dessa sessão</Text>
                    <Text style={{ color: "white" }}>R$ {masks.moneyMask(sessionData?.sessionValue)}</Text>
                </View>
                <View style={{ margin: 10 }} />
                <Divider bg="gray.800" width={"97%"} />
                <View style={{ margin: 10 }} />
                <View className={styles["phone-container"]}>
                    <View>
                        <Text style={{ color: "#999999" }}>Telefone</Text>
                        <Text style={{ color: "white" }}>{masks.phoneMask(String(pacientData?.telefone))}</Text>
                    </View>
                    <Pressable className={styles["phone-icon"]} onPress={() => openLinking("tel", String(pacientData?.telefone))}>
                        <FontAwesome5 name="phone-alt" size={12} color="#E91E63" style={{ opacity: 1 }} />
                    </Pressable>
                </View>
                <View style={{ margin: 10 }} />
                <Divider bg="gray.800" width={"97%"} />
                <View style={{ margin: 10 }} />

                <View>
                    <Text style={{ color: "#999999" }}>Data da sessão</Text>
                    <Text style={{ color: "white" }}>{moment(sessionData?.schedule_date).format("L") as any}, {moment(sessionData?.schedule_date).format("HH:mm")}</Text>
                </View>

                {renderForm()}
                <View style={{ margin: 10 }} />

                <View style={{ display: "flex", marginRight: 10 }}>
                    <Button size="lg" variant="outline" colorScheme="secondary"
                        borderColor={"pink.800"}
                        borderRadius={10}
                        onPress={() => openLinking("whatsapp", String(pacientData?.telefone))}>
                        Enviar whatsapp
                    </Button>
                </View>
            </NativeBaseProvider>
        </View>
    )
}