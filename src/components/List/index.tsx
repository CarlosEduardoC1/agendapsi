import { ReactElement } from "react";
import { Text, View } from "react-native";
import { Props } from "./@types";
import styles from "./styles.module.scss";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import moment from "moment";
import 'moment/locale/pt-br'
moment().locale("pt-br");

export const List: React.FC<Props> = ({ content, date }): ReactElement => {
    

    return (
        <View className={styles["container"]}>
            <View>
                <Text className={styles["content"]}>{moment(date.slice(0, date.length - 9)).format("LLLL").replace(" às 00:00", "").toLocaleUpperCase()}</Text>
            </View>
            {content.map((item, index) =>
                <View key={`${item.pacientName}-${index}`} className={styles["title-container"]}>
                    <Text className={styles["content"]}>{item.pacientName}</Text>
                    <Text className={styles["info"]}>{moment(item.sessionHour).format("HH:mm")}</Text>
                </View>
            )}
        </View>
    );
}