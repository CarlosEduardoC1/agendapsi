import { ReactElement } from "react";
import { Text, View } from "react-native";
import { Props } from "./@types";
import styles from "./styles.module.scss";

export const List: React.FC<Props> = ({ content, date }): ReactElement => {
    return (
        <View className={styles["container"]}>
            <View>
                <Text className={styles["content"]}>{date}</Text>
            </View>
            {content.map((item, index) =>
                <View key={`${item.pacientName}-${index}`} className={styles["title-container"]}>
                    <Text className={styles["content"]}>{item.pacientName}</Text>
                    <Text className={styles["info"]}>{item.sessionHour}</Text>
                </View>
            )}
        </View>
    );
}