import { ScrollView, Text, View } from "react-native";
import { weekDates, weekDays } from "./config";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import Timetable from "react-native-calendar-timetable";
import moment from "moment";

export const Calendar: React.FC = (): React.ReactElement => {
    const { week } = weekDays();
    const weekDatesNumber = weekDates();
    const todayWithMonthAndYear = dayjs().format("D [de] MMMM [de] YYYY");
    const todayOnlyNumber = dayjs().format("D");

    return (
        <View className={styles["container"]}>
            <View>
                <Text className={styles["content"]}>{todayWithMonthAndYear}</Text>
            </View>

            <View className={styles["days-container"]}>
                {week.map((day, index) =>
                    <Text key={`${day}-${index}`}
                        className={index === 0 || index === week.length - 1
                            ? styles["weekend"]
                            : styles[`selectable-days`]}>
                        {day}
                    </Text>)}
            </View>
            <View className={styles["days-container"]}>
                {weekDatesNumber.map((date, index) =>
                    <Text
                        style={date === todayOnlyNumber ? { borderRadius: 10 } : null}
                        key={`${date}-${index}`}
                        className={index === 0 || index === week.length - 1
                            ? styles["weekend"]
                            : date === todayOnlyNumber
                                ? styles["today"]
                                : styles[`selectable-days`]}>{date}</Text>)}
            </View>
            <ScrollView>
                <Timetable
                enableSnapping
                    items={[
                        {
                            title: "Evento",
                            startDate: moment().subtract(1, 'hour').toDate(),
                            endDate: moment().add(1, 'hour').toDate(),
                        }
                    ]}
                    linesLeftInset={2}
                    renderItem={props => <View key={props.key}
                        style={{
                            ...props.style,
                            display: "flex",
                            height: 50,
                            width: "100%",
                            backgroundColor: "#351829",
                            borderLeftColor: "red",
                            borderLeftWidth: 4,
                            opacity: 0.5,
                            paddingTop: 5,
                            paddingLeft: 10,
                            elevation: 5
                        }}><Text style={{
                            color: "white"
                        }}>
                            {props.item.title}</Text></View>
                    }
                    date={new Date()}
                    hideNowLine
                    style={{
                        timeContainer: {
                            backgroundColor: "transparent",
                        },
                        time: {
                            color: "#313439"
                        },
                    }}
                />
            </ScrollView>
        </View >
    );
}