import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Schedule } from "../../../app/schedule";
import { SCREEN_OPTIONS } from "../../config";
import { DrawerContent } from "./content";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={SCREEN_OPTIONS} drawerContent={DrawerContent}>
      <Drawer.Screen name="Agenda" component={Schedule} options={{ ...SCREEN_OPTIONS }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;