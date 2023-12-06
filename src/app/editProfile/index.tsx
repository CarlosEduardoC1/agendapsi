import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles.module.scss";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useComponent } from "./hooks";
import { useForm, Controller } from "react-hook-form";
import { Users } from "../../@types";
import { FormControl, NativeBaseProvider, Input } from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
    EditProfile: { id: string | number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfile: React.FC<Props> = ({ route }): React.ReactElement => {
    const [image, setImage] = useState<string>();
    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Users>();
    const { user } = useComponent({ id: String(route.params.id), handleSubmit });

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setValue("imagem", result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (user?.imagem) {
            setImage(user.imagem);
            setValue("imagem", user.imagem);
        }

        if (user) {
            reset({
                ...user
            })
        }
    }, [user]);

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.nome?.message}>
                            <FormControl.Label>Nome</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(txt)}
                            />
                            <FormControl.ErrorMessage>{errors.nome?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ marginTop: 10 }} />
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormControl isRequired isInvalid={!!errors.email?.message}>
                            <FormControl.Label>E-mail</FormControl.Label>
                            <Input
                                color={"gray.600"}
                                variant="unstyled"
                                keyboardType="email-address"
                                bg={"#272A30"}
                                {...field}
                                onChangeText={txt => field.onChange(txt)}
                            />
                            <FormControl.ErrorMessage>{errors.email?.message}</FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <View style={{ marginTop: 10 }} />
                <Pressable onPress={pickImage}>
                    <View className={styles["image-picker-container"]}>
                        {image ?
                            <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />
                            : <Entypo name="images" size={18} color="#999" />}
                        <Text className={styles["image-placeholder"]}>{image ? image.slice(0, 45) + "..." : "Escolha uma imagem..."}</Text>
                        {image && <Pressable style={{ position: "absolute", right: 10 }} onPress={() => { setImage(""); setValue("imagem", "") }}>
                            <AntDesign name="closecircle" size={18} color="#999" />
                        </Pressable>}
                    </View>
                </Pressable>
            </NativeBaseProvider>
        </View>
    )
} 