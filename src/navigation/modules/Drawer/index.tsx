import { createDrawerNavigator } from "@react-navigation/drawer";
import { Schedule } from "../../../app/schedule";
import { SCREEN_OPTIONS } from "../../config";
import { DrawerContent } from "./content";
import { Pacient } from "../../../app/pacient";
import { GlobalContext } from "../../../context/App";
import { AddSession } from "../../../app/addSession";
import { AddPacient } from "../../../app/addPacient";
import { PacientDetails } from "../../../app/pacientDetails";
import { PaymentReport } from "../../../app/paymentReport";
import { SessionResume } from "../../../app/sessionResume";
import { Financy } from "../../../app/financy";
import { EditSession } from "../../../app/editSession";
import { Profile } from "../../../app/profile";
import { EditProfile } from "../../../app/editProfile";
import { About } from "../../../app/about";
import { Pacient as TPacient, Users } from "../../../@types";
import { useCallback, useEffect, useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import * as Updates from 'expo-updates';

type RootStackParamList = {
  Agenda: any;
  Paciente: any;
  AddPacient: { isEditable: boolean, pacient: TPacient };
  AddSession: { hasPacient: boolean, pacient: string };
  PacientDetails: { pacient: TPacient };
  PaymentReport: { pacient_id: string | number };
  SessionResume: { id: string, sessionId: string };
  EditSession: { sessionId: string }
  EditProfile: { id: string | number };
  Financeiro: {};
  Profile: {};
  About: {};
}

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  const { state, ActionTypes, dispatch } = GlobalContext();
  const [user, setUser] = useState<Users[]>([]);
  const { onGet, onUpdate } = useUsers();

  const getUser = useCallback(async () => {
    const result = await onGet();
    if (result.length > 0) {
      setUser(result);
      if (result[0].email !== "seuemail@mail.com") {
        dispatch({ type: ActionTypes.SET_LOGGED, payload: true });
      }
    }
  }, []);

  const exit = useCallback(async (user: any) => {
    if (user) {
      await onUpdate(Number(user.id), { nome: "Seu Nome", email: "seuemail@mail.com" });
      dispatch({ type: ActionTypes.SET_LOGGED, payload: false });
      await Updates.reloadAsync();
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Drawer.Navigator screenOptions={SCREEN_OPTIONS(state.activeTab)} drawerContent={() => DrawerContent({ user, exit, logged: state.isLogged })}>
      <Drawer.Screen name="Agenda" component={Schedule} />
      <Drawer.Screen name="Paciente" component={Pacient} />
      <Drawer.Screen name="AddSession" component={AddSession} />
      <Drawer.Screen name="AddPacient" component={AddPacient} />
      <Drawer.Screen name="PacientDetails" component={PacientDetails} />
      <Drawer.Screen name="PaymentReport" component={PaymentReport} />
      <Drawer.Screen name="SessionResume" component={SessionResume} />
      <Drawer.Screen name="Financeiro" component={Financy} />
      <Drawer.Screen name="EditSession" component={EditSession} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;