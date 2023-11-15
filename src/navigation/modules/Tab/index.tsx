import { Pressable, Text, View } from "react-native";
import { GlobalContext } from "../../../context/App";
import { Tabs } from "../../../@types";
import styles from "./styles.module.scss";
import { TABS, TABS_ICON, TABS_PT } from "./config";

const BottomTabNavigator = () => {
    const { ActionTypes, dispatch, state } = GlobalContext();

    function handleChangeTab(tab: Tabs): void {
        dispatch({
            type: ActionTypes.ACTIVE_TAB,
            payload: tab
        })
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