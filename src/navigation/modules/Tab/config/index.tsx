import { ReactElement } from "react";
import { Tabs } from "../../../../@types";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export const TABS: Tabs[] = ["schedule", "pacient", "financy"];

export const TABS_PT: { [K in Tabs]: string } = {
  schedule: "Agenda",
  pacient: "Paciente",
  financy: "Financeiro",
};

export const TABS_ICON = (tab: Tabs, color: string): ReactElement => {
  return {
    schedule: <FontAwesome5 name="calendar-alt" size={30} color={color} />,
    pacient: <MaterialCommunityIcons name="account-eye" size={30} color={color} />,
    financy: <FontAwesome5 name="dollar-sign" size={30} color={color} />,
  }[tab];
};
