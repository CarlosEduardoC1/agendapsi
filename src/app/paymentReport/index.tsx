import { ActivityIndicator, ScrollView, View } from "react-native"
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { useComponent } from "./hooks";
import { List } from "../../components/List";
import { Calendar } from "../../components/Calendar";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    PaymentReport: { pacient_id: string | number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentReport'>;

export const PaymentReport: React.FC<Props> = ({ route }): React.ReactElement => {

    const { changeMode, mode, list, loading } = useComponent({ pacient_id: String(route.params.pacient_id) });

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

            />
            <ScrollView>
                {mode === "list" ? (
                    <>
                        {list.map((item, index) => <List
                            sessionId={String(item.id)}
                            key={`${item.id_paciente}-${index}`}
                            content={list.map(itm => ({ id: String(itm.id), pacientName: itm.payed ? "recebido" : "a receber", sessionHour: String(itm.schedule_date) }))}
                            date={String(item.schedule_date)}
                        />)}
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