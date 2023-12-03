import { View } from "react-native";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Pacient } from "../../@types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Button, FormControl, Input, NativeBaseProvider, } from "native-base";
import { masks } from "../../utils";
import { useComponent } from "./hooks";
import { Alert } from "../../components/Alert";
import { ALERT_DELETE_ITEM } from "./config";

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from "react";

type RootStackParamList = {
    AddPacient: { isEditable: boolean, pacient: Pacient };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddPacient'>;

export const AddPacient: React.FC<Props> = ({ route }): React.ReactElement => {
    const { control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Pacient>({
        resolver: yupResolver<any>(schema),
    });

    const { alert, setAlert, dropPacient } = useComponent({
        handleSubmit, isEditable: route?.params?.isEditable,
        pacient: route?.params?.pacient
    });

    useEffect(() => { if (route.params) reset({ ...route.params.pacient }) }, [route.params])

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Alert
                    isOpen={alert}
                    {...ALERT_DELETE_ITEM}
                    cancelRef={null}
                    onClose={() => setAlert("hide")}
                    onConfirm={() => dropPacient(String(route?.params?.pacient.id))}
                />
                <Controller
                    control={control}
                    name="nome"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.nome}>
                            <FormControl.Label>Nome</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(txt)}
                            />
                            {errors.nome && <FormControl.ErrorMessage
                                color={"red"}
                            >{errors.nome?.message}</FormControl.ErrorMessage>}
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="telefone"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.telefone}>
                            <FormControl.Label>Telefone</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="number-pad"
                                bg={"#272A30"}
                                {...field}
                                onBlur={() => field.onChange(masks.phoneMask(field.value))}
                                onChangeText={txt => field.onChange(txt)}
                            />

                            {errors.telefone && <FormControl.ErrorMessage
                                color={"red"}
                            >{errors.telefone?.message}</FormControl.ErrorMessage>}
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormControl.Label>E-mail</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="email-address"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(txt)}
                            />


                            {errors.email && <FormControl.ErrorMessage
                                color={"red"}
                            >{errors.email?.message}</FormControl.ErrorMessage>}
                        </FormControl>
                    )}
                />
                <View style={{ margin: 10 }} />
                {!route?.params?.isEditable && <Controller
                    control={control}
                    name="valor"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.valor}>
                            <FormControl.Label>Valor</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="number-pad"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(masks.moneyMask(txt))}
                            />


                            {errors.valor && <FormControl.ErrorMessage
                                color={"red"}
                            >{errors.valor?.message}</FormControl.ErrorMessage>}
                        </FormControl>
                    )}
                />}
                <View style={{ margin: 10 }} />
                {route?.params?.isEditable && <Button
                    variant="ghost"
                    onPress={() => setAlert("show")}
                    _text={{ color: "red.400" }}
                >
                    Deletar item</Button>}
            </NativeBaseProvider>
        </View>
    );
}