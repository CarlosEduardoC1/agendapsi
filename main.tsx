import { Register } from "./src/app/register";
import { GlobalContext } from "./src/context/App";
import DrawerNavigator from "./src/navigation/modules/Drawer";
import BottomTabNavigator from "./src/navigation/modules/Tab";

export function Main() {

    const { state } = GlobalContext();

    return (
        <>
            {
                !state.registerPage ?
                    <>
                        <DrawerNavigator />
                        <BottomTabNavigator />
                    </> : <Register />}
        </>
    )
}