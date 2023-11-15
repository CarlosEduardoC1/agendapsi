import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Pressable, View } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';

export const SCREEN_OPTIONS: DrawerNavigationOptions = {
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: "#E91E63",
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "white"
  },
  drawerActiveBackgroundColor: "#182026",
  drawerIcon: ({ size, color }) => <Entypo name="menu" size={size}/>,
  // headerRight: () => (
  //   <Pressable>
  //     <AntDesign name="plus" size={24} color="#E91E63" />
  //   </Pressable>
  // )
}

export const SCHEDULE_OPTIONS: DrawerNavigationOptions = {
  headerRight: () => <AntDesign name="plus" size={24} color="#E91E63" />
}