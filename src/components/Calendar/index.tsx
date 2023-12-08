import { ScrollView, Text, View, Dimensions } from "react-native";
import { weekDates, weekDays } from "./config";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import Timetable from "react-native-calendar-timetable";
import moment from "moment";
import { useEffect, useState } from "react";
import { Props } from "./@types";

export const Calendar: React.FC<Props> = ({ list, titleParam, startDateParam }): React.ReactElement => {
    const { week } = weekDays();
    const weekDatesNumber = weekDates();
    const todayWithMonthAndYear = dayjs().format("DD [de] MMMM [de] YYYY");
    const [selectedDay, setSelectedDay] = useState(dayjs().format("DD"));
    const [renderedItems, setRenderedItems] = useState<any[]>([]);

    function verifyTitleParam(payed: boolean): string {
        if (payed) return "recebido";
        return "a receber";
    }

    useEffect(() => {

        const keys = Object.keys(list);
        if (keys.length > 0) {
            const data: any[] = [];
            keys.map((item: any) => {
                return list[item].map((element: any) => {
                    const day = moment(item + " às " + element.sessionHour, 'LLLL');

                    if (day.format("DD/MM") === selectedDay + "/" + moment().format("MM")) {
                        data.push({
                            title: element[titleParam === "verification" ? verifyTitleParam(item.payed) : titleParam],
                            startDate: moment(item + " às " + element.sessionHour, 'LLLL') as any,
                            endDate: moment(item + " às " + element.sessionHour, 'LLLL').subtract(1, "hour")
                        });
                    }
                })
            });

            setRenderedItems(data);
        }
    }, [selectedDay]);

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
                    items={renderedItems}
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