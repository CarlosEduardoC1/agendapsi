import { ScrollView, Text, View, Dimensions } from "react-native";
import { weekDates, weekDays } from "./config";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import Timetable from "react-native-calendar-timetable";
import moment from "moment";
import { useEffect, useState } from "react";

export const Calendar: React.FC = (): React.ReactElement => {
    const { week } = weekDays();
    const weekDatesNumber = weekDates();
    const todayWithMonthAndYear = dayjs().format("D [de] MMMM [de] YYYY");
    const [selectedDay, setSelectedDay] = useState("");

    useEffect(() => {
        setSelectedDay(dayjs().format("D"))
    }, []);

    return (
        <View >
            <View className={styles["container"]} style={{ flex: 1 }}>
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
                            onPress={() => setSelectedDay(date)}
                            key={`${date}-${index}`}
                            className={index === 0 || index === week.length - 1
                                ? styles["weekend"]
                                : date === selectedDay
                                    ? styles["today"]
                                    : styles[`selectable-days`]}>{date}</Text>)}
                </View>
            </View>
            <ScrollView style={{ flex: 2, height: Dimensions.get("screen").height / 2 }}
                alwaysBounceVertical>
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
                            color: "white",
                            opacity: 1,
                            fontWeight: "bold"
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