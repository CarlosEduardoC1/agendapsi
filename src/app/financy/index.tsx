import { ScrollView, Text, View } from "react-native"
import styles from "./styles.module.scss";
import { BarChart } from "react-native-gifted-charts";
import { Divider, NativeBaseProvider } from "native-base";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useComponent } from "./hooks";
import { masks } from "../../utils";

export const Financy: React.FC = (): React.ReactElement => {

    const { chartData, oppenedSessions, handleRedirect } = useComponent();

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <BarChart
                    barWidth={22}
                    noOfSections={6}
                    barBorderRadius={4}
                    data={chartData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    xAxisLabelTextStyle={{ color: "#979797" }}
                    yAxisTextStyle={{ color: "#979797" }}
                    isAnimated
                />
                <View className={styles["subtitle"]}>
                    <View className={styles["item"]}>
                        <View className={styles["color"]} style={{ backgroundColor: "#F0C9AF" }} />
                        <Text style={{ color: "white" }}>Recebido</Text>
                    </View>
                    <Divider bg="gray.800" width={"97%"} />
                    <View className={styles["item"]}>
                        <View className={styles["color"]} style={{ backgroundColor: "#7690B6" }} />
                        <Text style={{ color: "white" }}>A Receber</Text>
                    </View>
                </View>
                <Divider bg="gray.800" width={"97%"} />
                <View style={{ margin: 5 }} />
                <Divider bg="gray.800" width={"97%"} />
                <View style={{ margin: 10 }} />
                <Text style={{ color: "#999999" }}>Sessões em aberto</Text>
                <View style={{ margin: 5 }} />
                <ScrollView>
                    {oppenedSessions.map(item => (
                        <Pressable onPress={() => handleRedirect(String(item.id_paciente), String(item.id))}
                            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <Text style={{ color: "white" }}>R$ {masks.moneyMask(item.sessionValue)}</Text>
                            </View>
                            <Entypo name="chevron-small-right" size={24} color="#999" />
                        </Pressable>))}
                </ScrollView>
                <View style={{ margin: 10 }} />
                <Divider bg="gray.800" width={"97%"} />
            </NativeBaseProvider>
        </View>
    );
}