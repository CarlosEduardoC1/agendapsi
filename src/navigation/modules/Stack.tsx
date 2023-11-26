import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Schedule } from "../../app/schedule";
import { Pacient } from "../../app/pacient";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Paciente" component={Pacient} />
            <Stack.Screen name="Agenda" component={Schedule} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };