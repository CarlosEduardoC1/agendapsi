import { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { Props } from "./@types";
import styles from "./styles.module.scss";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import 'moment/locale/pt-br'
moment().locale("pt-br");

export const List: React.FC<Props> = ({ content, date, sessionId }): ReactElement => {
    const { navigate } = useNavigation<any>();
    return (
        <View className={styles["container"]}>
            <View>
                <Text className={styles["content"]}>{date.toLocaleUpperCase()}</Text>
            </View>
            {content.map((item, index) =>
                <Pressable onPress={() => navigate("SessionResume", { id: item.id, sessionId })}
                    key={`${item.pacientName}-${index}`} className={styles["title-container"]}>
                    <Text className={styles["content"]}>{item.pacientName}</Text>
                    <Text className={styles["info"]}>{moment(item.sessionHour).format("HH:mm")}</Text>
                </Pressable>
            )}
        </View>
    );
}