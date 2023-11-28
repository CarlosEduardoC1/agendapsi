import { ActivityIndicator, ScrollView, View } from "react-native";
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { useComponent } from "./hooks";
import { List } from "./components";

export const Pacient: React.FC<any> = (): React.ReactElement => {
    const { pacients, loading } = useComponent();

    if (loading) {
        return (
            <View className={styles["container"]}>
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
                {
                    pacients.map((pacient, index) => (
                        <List key={`${index}-${pacient.telefone}`} pacient={pacient} />
                    ))
                }
            </ScrollView>
        </View>
    );
}