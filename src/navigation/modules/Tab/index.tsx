import { Pressable, Text, View } from "react-native";
import { GlobalContext } from "../../../context/App";
import { Tabs } from "../../../@types";
import styles from "./styles.module.scss";
import { useNavigation } from "@react-navigation/native";
import { TABS, TABS_ICON, TABS_PT } from "./config";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type ScreenNames = ["Agenda", "Paciente", "Financeiro"];
type ScreenNamesRecorded = Record<ScreenNames[number], undefined>

const BottomTabNavigator = () => {
    const { ActionTypes, dispatch, state } = GlobalContext();
    const { navigate } = useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();

    function handleChangeTab(tab: Tabs): void {
        dispatch({
            type: ActionTypes.ACTIVE_TAB,
            payload: tab
        });
        navigate(TABS_PT[tab] as any);
    }

    return (
        <View className={styles["tab-container"]}>
            {
                TABS.map(tab => <View key={tab}>
                    <Pressable onPress={() => handleChangeTab(tab)}>
                        <View className={styles["button-container"]}>
                            {TABS_ICON(tab, state?.activeTab === tab ? "#E91E63" : "#6C6C6C")}
                            <Text className={state?.activeTab === tab ? styles["tab-label-active"] : styles[`tab-label`]}>
                                {TABS_PT[tab]}
                            </Text>
                        </View>
                    </Pressable>
                </View>
                )
            }
        </View>
    );
};

export default BottomTabNavigator;