import { Pressable, View } from "react-native";
import styles from "./styles.module.scss";
import { AntDesign } from '@expo/vector-icons';
import { Text } from "react-native";
import { Button, Input, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { GlobalContext } from "../../context/App";
import { useUsers } from "../../hooks/useUsers";

export const Register: React.FC = (): React.ReactElement => {
    const [mail, setMail] = useState<string>();
    const { ActionTypes, dispatch } = GlobalContext();
    const { onSave, onGet, onUpdate } = useUsers();

    function validateMail(): boolean {
        return /\S+@\S+\.\S+/.test(String(mail));
    }

    useEffect(() => {
        validateMail();
    }, [mail]);

    async function submit() {
        const hasUsers = await onGet();
        if (hasUsers.length > 0) {
            await onUpdate(Number(hasUsers[0].id), { ...hasUsers[0], email: mail })
        } else {
            await onSave({ nome: "Seu Nome", email: String(mail).toLocaleLowerCase() });
        }
        dispatch({ type: ActionTypes.SET_LOGGED, payload: true });
        dispatch({ type: ActionTypes.SHOW_REGISTER_PAGE, payload: false });

    }

    return (
        <View className={styles["container"]}>
            <NativeBaseProvider>
                <Pressable onPress={() => dispatch({ type: ActionTypes.SHOW_REGISTER_PAGE, payload: false })}
                    className={styles["close-icon-container"]}>
                    <AntDesign name="close" size={24} color="white" />
                </Pressable>
                <View className={styles["header-container"]}>
                    <Text className={styles["title"]}>Oi</Text>
                    <Text className={styles["simple-text"]}>Digite seu endereço de e-mail</Text>
                    <Input
                        style={{ backgroundColor: "#EE568A", opacity: 0.5, color: "white", fontWeight: "bold" }}
                        placeholder="E-mail"
                        placeholderTextColor={"white"}
                        marginTop={5}
                        value={mail}
                        onChangeText={tx => setMail(tx)}
                    />
                </View>
                <View className={styles["buttons-container"]}>
                    <Button
                        style={{ width: "100%", backgroundColor: "white" }}
                        _text={{ color: "black", fontWeight: "bold" }}
                        isDisabled={!validateMail()}
                        onPress={submit}
                    >Continuar</Button>
                    <View style={{ marginTop: 10 }} />
                    <Button
                        style={{ width: "100%", backgroundColor: "white" }}
                        _text={{ color: "black", fontWeight: "bold" }}
                        leftIcon={<AntDesign name="google" size={24} color="black" />}>
                        Faça login com o Google</Button>
                </View>
            </NativeBaseProvider>
        </View>
    )
}