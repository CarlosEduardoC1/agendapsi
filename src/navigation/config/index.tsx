import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { Pressable } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Tabs } from "../../@types";
import { useNavigation } from "@react-navigation/native";

type ScreenNames = ["AddSession"];
type ScreenNamesRecorded = Record<ScreenNames[number], undefined>

export const SCREEN_OPTIONS = (tab: Tabs): DrawerNavigationOptions => {
  const { navigate } = useNavigation<DrawerNavigationProp<ScreenNamesRecorded>>();
  
  return {
    headerStyle: {
      backgroundColor: "#000",
    },
    headerTintColor: "#E91E63",
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: "white"
    },
    drawerActiveBackgroundColor: "#182026",
    drawerIcon: ({ size }) => <Entypo name="menu" size={size} />,
    headerRight: () =>
      <Pressable onPress={() => navigate(handleNavigate(tab) as any)} style={{ marginRight: 12 }}>
        <AntDesign name="plus" size={24} color="#E91E63" />
      </Pressable>
  }
}

export const SCHEDULE_OPTIONS: DrawerNavigationOptions = {
  headerRight: () => <AntDesign name="plus" size={24} color="#E91E63" />
}

function handleNavigate(tab: Tabs) {
  return {
    "schedule": "AddSession",
    "pacient": "AddPacient",
    "financy": "AddFinancy"
  }[tab]
}