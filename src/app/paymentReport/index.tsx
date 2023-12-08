import { ActivityIndicator, Pressable, ScrollView, View } from "react-native"
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { useComponent } from "./hooks";
import { Calendar } from "../../components/Calendar";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Filter } from "./component/Filter";
import { useState } from "react";

type RootStackParamList = {
    PaymentReport: { pacient_id: string | number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentReport'>;

export const PaymentReport: React.FC<Props> = ({ route }): React.ReactElement => {
    const { navigate } = useNavigation<any>();
    const [search, setSearch] = useState("");
    const { changeMode, mode, list, loading, openFilter, handleFilter, filter, setFilter } = useComponent({ pacient_id: String(route.params.pacient_id) });

    if (loading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View className={styles["container"]}>
            <SearchBar
                placeholder="Procurar"
                containerStyle={{ backgroundColor: "black" }}
                value={search}
                onChangeText={tx => {
                    setSearch(tx);
                    if (tx === "") {
                        setFilter("Tudo");
                    }
                    else {
                        setFilter(tx);
                    }
                }}

            />
            <Filter
                isOpen={openFilter}
                onClose={() => handleFilter(false)}
                onFilter={(t: string) => { setFilter(t); handleFilter(false) }}
            />
            <ScrollView style={{ flex: 1, padding: 12 }}>
                {mode === "list" ? (
                    <>
                        {Object.keys(list).map((item, index) =>
                            <View key={`${item}-${index}`} style={{ marginTop: 10 }}>
                                <View>
                                    <Text className={styles["content"]}>{item.toLocaleUpperCase()}</Text>
                                </View>
                                {
                                    (list[item as any] as any).map((itm: any, i: number) => {
                                        if (itm.pacientName === filter.toLocaleLowerCase()
                                            || filter === "Tudo"
                                            || filter === ""
                                            || itm.pacientName.includes(filter.toLocaleLowerCase())) {

                                            return (
                                                <Pressable onPress={() => navigate("SessionResume", { id: itm.id, sessionId: itm.sessionId })}
                                                    key={`${itm.pacientName}-${i}`} className={styles["title-container"]}>
                                                    <Text className={styles["content"]}>{itm.pacientName}</Text>
                                                    <Text className={styles["info"]}>{itm.sessionHour}</Text>
                                                </Pressable>
                                            )
                                        }
                                    })
                                }
                            </View>)}
                    </>
                ) : <Calendar list={list} startDateParam={"schedule_date"} titleParam={"verification"} />}
            </ScrollView>
            <FAB
                visible={true}
                icon={{ name: mode, color: 'white' }}
                size="large"
                placement="right"
                onPress={() => changeMode(mode === "list" ? "event" : "list")}
            />
        </View>
    )
}