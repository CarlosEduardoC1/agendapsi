import { ScrollView, View } from "react-native"
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { useComponent } from "./hooks/useComponent";
import { List } from "../../components/List";
import { Calendar } from "../../components/Calendar";

export const Schedule: React.FC = (): React.ReactElement => {
    const { changeMode, mode, list, changeSearch, search } = useComponent();

    return (
        <View className={styles["container"]}>
            <SearchBar
                placeholder="Procurar"
                value={search}
                containerStyle={{ backgroundColor: "black" }}
                onChangeText={changeSearch}
            />
            <ScrollView>
                {mode === "list" ? (
                    <>
                        {list.map((item, index) => <List key={`${item.content}-${index}`} {...item} />)}
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