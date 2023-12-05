import dayjs from "dayjs";

export function handleSessionValues(data: any): any {
  const form: any = {};
  form.schedule_date = String(dayjs(data.date).format("YYYY-MM-DD HH:mm:ss"));
  form.sessionValue = data.sessionValue;
  return form;
}
