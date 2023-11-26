import { AntDesign, Entypo } from "@expo/vector-icons";
import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Tabs } from "../../../@types";

type ScreenNames = ["AddSession", "AddPacient"];
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

function handleNavigate(tab: Tabs) {
  return {
    "schedule": "AddSession",
    "pacient": "AddPacient",
    "financy": "AddFinancy"
  }[tab]
}