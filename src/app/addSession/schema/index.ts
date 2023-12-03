import * as yup from "yup";
import { FormValues } from "../@types";
import { FORM_ERRORS } from "../config";

export const schema = yup.object<FormValues>({
  pacient: yup.number().positive().required(FORM_ERRORS.pacient.required),
  session_value: yup.string().required(FORM_ERRORS.session_value.required),
  date_time: yup.string().required(FORM_ERRORS.date_time.required),
});
