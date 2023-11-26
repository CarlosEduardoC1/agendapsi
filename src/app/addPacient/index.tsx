import { View } from "react-native";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Pacient } from "../../@types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { FormControl, Input, NativeBaseProvider } from "native-base";
import { masks } from "../../utils";
import { useComponent } from "./hooks";

export const AddPacient: React.FC = (): React.ReactElement => {
    const { control,
        handleSubmit,
        formState: { errors }
    } = useForm<Pacient>({
        resolver: yupResolver<any>(schema),
    });

    useComponent({ handleSubmit });

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
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
                <Controller
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
                />
                <View style={{ margin: 10 }} />
            </NativeBaseProvider>
        </View>
    );
}