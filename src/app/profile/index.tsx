import { Image, ImageBackground, Pressable, Text, View } from "react-native"
import styles from "./styles.module.scss";
import { useComponent } from "./hooks";
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";

export const Profile: React.FC = (): React.ReactElement => {
    const [image, setImage] = useState<string>();
    const { user, handleSubmit } = useComponent({ image });

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleSubmit({ ...user, imagem: result.assets[0].uri });
        }
    };

    useEffect(() => {
        if (user.imagem) {
            setImage(user.imagem);
        }
    }, [user]);

    return (
        <View className={styles["container"]}>
            {image && <ImageBackground style={{
                display: "flex",
                width: "100%",
                height: 220
            }} source={{ uri: image }}>
                <View style={{ position: "absolute", bottom: 0 }}>
                    <Text className={styles["name"]}>{user.nome}</Text>
                    <Text className={styles["mail"]} style={{ color: "white" }}>{user.email}</Text>
                </View>
            </ImageBackground>}
            {!image && <>
                <Text className={styles["name"]}>{user.nome}</Text>
                <Text className={styles["mail"]}>{user.email}</Text>
            </>}
            <View style={{ marginTop: 20 }} />
            <Text className={styles["image-label"]}>Imagem</Text>
            <Pressable onPress={pickImage}>
                <View className={styles["image-picker-container"]}>
                    {image ?
                        <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />
                        : <Entypo name="images" size={18} color="#999" />}
                    <Text className={styles["image-placeholder"]}>{image ? image.slice(0, 45) + "..." : "Escolha uma imagem..."}</Text>
                    {image && <Pressable style={{ position: "absolute", right: 10 }} onPress={() => {
                        handleSubmit({ ...user, imagem: "" }).then(() => setImage(""));

                    }}>
                        <AntDesign name="closecircle" size={18} color="#999" />
                    </Pressable>}
                </View>
            </Pressable>
        </View>
    )
}