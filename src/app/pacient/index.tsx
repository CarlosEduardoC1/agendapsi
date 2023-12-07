import { ScrollView, View } from "react-native";
import styles from "./styles.module.scss";
import { SearchBar } from '@rneui/themed';
import { useComponent } from "./hooks";
import { List } from "./components";

export const Pacient: React.FC<any> = (): React.ReactElement => {
    const { pacients, search, changeSearch } = useComponent();

    return (
        <View className={styles["container"]}>
            <SearchBar
                placeholder="Procurar"
                containerStyle={{ backgroundColor: "black" }}
                value={search}
                onChangeText={changeSearch}
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