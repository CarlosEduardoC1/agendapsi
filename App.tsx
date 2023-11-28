import { NavigationContainer } from "@react-navigation/native";
import DataBase from "./src/service";
import DrawerNavigator from "./src/navigation/modules/Drawer";
import "react-native-gesture-handler"
import BottomTabNavigator from "./src/navigation/modules/Tab";
import { GlobalContextProvider } from "./src/context/App";
import { StatusBar } from "expo-status-bar";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
dayjs.locale("pt-br")

new DataBase();

const App = () => {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <StatusBar style="inverted" />
        <DrawerNavigator />
        <BottomTabNavigator />
      </GlobalContextProvider>
    </NavigationContainer>
  );
}
export default App;