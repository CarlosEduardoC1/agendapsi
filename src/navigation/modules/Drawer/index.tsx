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
import { Sessions, Pacient as TPacient } from "../../../@types";

type RootStackParamList = {
  Agenda: any;
  Paciente: any;
  Financeiro: {};
  AddPacient: { isEditable: boolean, pacient: TPacient };
  AddSession: { hasPacient: boolean, pacient: string };
  PacientDetails: { pacient: TPacient };
  PaymentReport: { pacient_id: string | number };
  SessionResume: { id: string, sessionId: string };
  EditSession: { sessionId: string }
}

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  const { state } = GlobalContext();

  return (
    <Drawer.Navigator screenOptions={SCREEN_OPTIONS(state.activeTab)} drawerContent={DrawerContent}>
      <Drawer.Screen name="Agenda" component={Schedule} />
      <Drawer.Screen name="Paciente" component={Pacient} />
      <Drawer.Screen name="AddSession" component={AddSession} />
      <Drawer.Screen name="AddPacient" component={AddPacient} />
      <Drawer.Screen name="PacientDetails" component={PacientDetails} />
      <Drawer.Screen name="PaymentReport" component={PaymentReport} />
      <Drawer.Screen name="SessionResume" component={SessionResume} />
      <Drawer.Screen name="Financeiro" component={Financy} />
      <Drawer.Screen name="EditSession" component={EditSession} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;