import { Errors } from "../../../@types";
import { FormValues } from "../@types";

export const FORM_ERRORS: Errors<FormValues> = {
  pacient: {
    required: "O paciente é um campo obrigatório",
  },
  date_time: {
    required: "Data e hora são valores obrigatórios",
  },
  session_value: {
    required: "Você precisa informar o valor da sessão",
  },
  date: {
    required: "",
  },
};
