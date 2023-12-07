import { NavigationContainer } from "@react-navigation/native";
import DataBase from "./src/service";
import "react-native-gesture-handler"
import { GlobalContextProvider } from "./src/context/App";
import { StatusBar } from "expo-status-bar";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { Main } from "./main";
dayjs.locale("pt-br")

new DataBase();

const App = () => {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <StatusBar style="light" />
        <Main />
      </GlobalContextProvider>
    </NavigationContainer>
  );
}
export default App;