import { Actionsheet, NativeBaseProvider } from "native-base";
import React from "react";
import { View } from "react-native";

interface Props {
    isOpen: boolean;
    onClose: any;
    onFilter: (p: string) => void;
}

export const Filter: React.FC<Props> = ({ isOpen, onClose, onFilter }): React.ReactElement => {
    return (
        <View>
            <NativeBaseProvider>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item onPress={() => onFilter("Tudo")}>Tudo</Actionsheet.Item>
                        <Actionsheet.Item onPress={() => onFilter("Recebido")}>Recebido</Actionsheet.Item>
                        <Actionsheet.Item onPress={() => onFilter("A Receber")}>A Receber</Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </NativeBaseProvider>
        </View >
    )
}