import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { useComponent } from "./hooks/useComponent";
import { List } from "../../components/List";
import { Calendar } from "../../components/Calendar";

export const Schedule: React.FC = (): React.ReactElement => {
    const { changeMode, mode, list, loading } = useComponent();

    if (loading) {
        return (
            <View>
                <ActivityIndicator  />
            </View>
        )
    }
    return (
        <View className={styles["container"]}>
            <SearchBar
                placeholder="Procurar"
                containerStyle={{ backgroundColor: "black" }}

            />
            <ScrollView>
                {mode === "list" ? (
                    <>
                        {list.map((item, index) => <List key={`${item.content}-${index}`} {...item} />)}
                    </>
                ) : <Calendar />}
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