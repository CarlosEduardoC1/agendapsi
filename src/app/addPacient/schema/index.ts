import * as yup from "yup";
import { FORM_ERRORS } from "../config";
import { Pacient } from "../../../@types";

export const schema = yup.object<Pacient>({
  nome: yup.string().required(FORM_ERRORS.nome["required"]),
  telefone: yup.string().required(FORM_ERRORS.telefone["required"]),
  email: yup
    .string()
    .email(FORM_ERRORS.email["email"])
    .required(FORM_ERRORS.email["required"]),
  valor: yup.string().required(FORM_ERRORS.valor["required"]),
});
