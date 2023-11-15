import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Schedule } from "../../app/schedule";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Agenda" component={Schedule} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };