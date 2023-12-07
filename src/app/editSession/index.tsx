import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles.module.scss";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Sessions } from "../../@types";
import { Alert } from "../../components/Alert";
import { useComponent } from "./hooks";
import { ALERT_DELETE_ITEM } from "./config";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, Input, NativeBaseProvider } from "native-base";
import { masks } from "../../utils";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type RootStackParamList = {
    EditSession: { sessionId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditSession'>;

export const EditSession: React.FC<Props> = ({ route }): React.ReactElement => {
    const { handleSubmit, control, reset, setValue } = useForm<any>();

    const { alert,
        setAlert,
        deleteSession,
        sessions,
        open_date_picker,
        setDatePicker,
        parseDate } = useComponent({ handleSubmit, id: Number(route.params?.sessionId) });

    useEffect(() => {
        if (sessions !== null || sessions !== undefined) {
            console.log("SEXONS",sessions);
            reset({
                sessionValue: sessions?.sessionValue,
                schedule_date: parseDate(sessions?.schedule_date as Date)
            })
        }
    }, [sessions])

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Alert
                    isOpen={alert}
                    {...ALERT_DELETE_ITEM}
                    cancelRef={null}
                    onClose={() => setAlert("hide")}
                    onConfirm={() => deleteSession()}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="schedule_date"
                    render={({ field }) => (
                        <FormControl isRequired >
                            <FormControl.Label>Dia e hora da sessão</FormControl.Label>
                            <Input
                                {...field}
                                value={field.value}
                                color={"gray.600"}
                                variant="unstyled"
                                bg={"#272A30"}
                                InputLeftElement={
                                    <Pressable onPress={() => setDatePicker("open")}
                                        style={{ marginLeft: 5 }}>
                                        <Entypo name="calendar" size={24} color="#999999" />
                                    </Pressable>}
                                InputRightElement={
                                    field?.value?.length > 0
                                        ? <Pressable
                                            onPress={() => field.onChange("")}
                                            style={{ marginRight: 5 }}>
                                            <AntDesign name="closecircle" size={18} color="#999" />
                                        </Pressable>
                                        : undefined}
                                editable={false}
                                showSoftInputOnFocus={false}
                                onPressIn={() => setDatePicker("open")}
                            />
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="sessionValue"
                    render={({ field }) => (
                        <FormControl isRequired>
                            <FormControl.Label>Valor da sessão</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="number-pad"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(masks.moneyMask(txt))}
                            />
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Button
                    variant="ghost"
                    onPress={() => setAlert("show")}
                    _text={{ color: "red.400" }}
                >
                    Deletar item</Button>
                <SafeAreaView>
                    <DateTimePickerModal
                        isVisible={open_date_picker}
                        mode="datetime"
                        onConfirm={date => {
                            setValue("schedule_date", parseDate(date));
                            setValue("date", date);
                            setDatePicker("close");
                        }}
                        onCancel={() => setDatePicker("close")}
                    />
                </SafeAreaView>
            </NativeBaseProvider>
        </View>
    )
}