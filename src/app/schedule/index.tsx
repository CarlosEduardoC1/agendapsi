import { Pressable, ScrollView, View } from "react-native"
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { useComponent } from "./hooks/useComponent";
import { List } from "../../components/List";
import { Calendar } from "../../components/Calendar";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Schedule: React.FC = (): React.ReactElement => {
    const { navigate } = useNavigation<any>();
    const { changeMode, mode, list, changeSearch, search } = useComponent();
    
    return (
        <View className={styles["container"]}>
            <SearchBar
                placeholder="Procurar"
                value={search}
                containerStyle={{ backgroundColor: "black" }}
                onChangeText={changeSearch}
            />
            <ScrollView style={{ flex: 1, padding: 12 }}>
                {mode === "list" ? (
                    <>
                        {Object.keys(list).map((item, index) =>
                            <View style={{ marginTop: 10 }}>
                                <View>
                                    <Text className={styles["content"]}>{item.toLocaleUpperCase()}</Text>
                                </View>
                                {
                                    (list[item as any] as any).map((itm: any, index: number) =>
                                        <Pressable onPress={() => navigate("SessionResume", { id: itm.id, sessionId: itm.sessionId })}
                                            key={`${itm.pacientName}-${index}`} className={styles["title-container"]}>
                                            <Text className={styles["content"]}>{itm.pacientName}</Text>
                                            <Text className={styles["info"]}>{itm.sessionHour}</Text>
                                        </Pressable>
                                    )
                                }
                            </View>)}
                    </>
                ) : <Calendar list={list} startDateParam={"pacientName"} titleParam={"sessionHour"} />}
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