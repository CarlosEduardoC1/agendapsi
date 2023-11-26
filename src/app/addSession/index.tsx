import { Pressable, SafeAreaView, View } from "react-native"
import styles from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import { FormValues } from "./@types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Select, FormControl, NativeBaseProvider, Input, Switch } from "native-base";
import { useComponent } from "./hooks";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo, AntDesign } from '@expo/vector-icons';

export const AddSession: React.FC = (): React.ReactElement => {
    const { control,
        handleSubmit,
        formState: { errors },
        setValue } = useForm<FormValues>({
            resolver: yupResolver<any>(schema),
        });

    const { pacient_list,
        open_date_picker,
        setDatePicker,
        parseDate } = useComponent({ handleSubmit });

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Controller
                    control={control}
                    name="pacient"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.pacient}>
                            <FormControl.Label>Paciente</FormControl.Label>
                            <Select
                                color={"gray.600"}
                                variant="unstyled"
                                bg={"#272A30"}
                                selectedValue={String(field.value)}
                                onValueChange={value => field.onChange(value)}
                            >
                                {pacient_list.map((pacient, index) => (
                                    <Select.Item key={`${pacient.value}-${index}`} {...pacient} />
                                ))}
                            </Select>
                            <FormControl.ErrorMessage>{errors.pacient?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="session_value"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.session_value}>
                            <FormControl.Label>Valor da sessão</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="number-pad"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(txt)}
                            />
                            <FormControl.ErrorMessage>{errors.session_value?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="date_time"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.date_time}>
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
                            <FormControl.ErrorMessage>{errors.date_time?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="showUp"
                    render={({ field }) => (
                        <FormControl
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControl.Label>Compareceu?</FormControl.Label>
                            <Switch
                                {...field}
                                onTrackColor={"red.500"}
                                defaultIsChecked={Boolean(field.value)}
                                isChecked={Boolean(field.value)}
                                onToggle={ev => field.onChange(ev)} />
                            <FormControl.ErrorMessage>{errors.showUp?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="payed"
                    render={({ field }) => (
                        <FormControl
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControl.Label>Pagou?</FormControl.Label>
                            <Switch
                                {...field}
                                onTrackColor={"red.500"}
                                defaultIsChecked={Boolean(field.value)}
                                isChecked={Boolean(field.value)}
                                onToggle={ev => field.onChange(ev)} />
                            <FormControl.ErrorMessage>{errors.payed?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
            </NativeBaseProvider>
            <SafeAreaView>
                <DateTimePickerModal
                    isVisible={open_date_picker}
                    mode="datetime"
                    style={{ backgroundColor: "#272A30" }}
                    onConfirm={(props) => setValue("date_time", parseDate(props))}
                    onCancel={() => setDatePicker("close")}
                />
            </SafeAreaView>
        </View >
    )
}