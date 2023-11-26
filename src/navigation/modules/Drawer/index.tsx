import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Schedule } from "../../../app/schedule";
import { SCREEN_OPTIONS } from "../../config";
import { DrawerContent } from "./content";
import { Pacient } from "../../../app/pacient";
import { GlobalContext } from "../../../context/App";
import { ADD_SESSION_OPTIONS } from "../../config/pages.config";
import { AddSession } from "../../../app/addSession";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { state } = GlobalContext();

  return (
    <Drawer.Navigator screenOptions={SCREEN_OPTIONS(state.activeTab)} drawerContent={DrawerContent}>
      <Drawer.Screen name="Agenda" component={Schedule} />
      <Drawer.Screen name="Paciente" component={Pacient} />
      <Drawer.Screen name="AddSession" component={AddSession} options={ADD_SESSION_OPTIONS} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;