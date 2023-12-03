import dayjs from "dayjs";
import { Sessions } from "../../../../../@types";
import { FormValues } from "../../../@types";

export function handleSessionValues(data: FormValues): Sessions {
  const form: any = {};
  console.log(new Date(data.date))
  form.id_paciente = Number(data.pacient);
  form.schedule_date = String(dayjs(data.date).format("YYYY-MM-DD HH:mm:ss"));
  form.payed = Boolean(data.payed);
  form.executed = Boolean(data.showUp);
  form.sessionValue = data.session_value;
  form.received = 0.0;
  form.toReceive = data.session_value;
  return form;
}
