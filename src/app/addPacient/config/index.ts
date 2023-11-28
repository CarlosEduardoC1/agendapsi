import { Errors, Pacient } from "../../../@types";

export const FORM_ERRORS: Errors<Pacient> = {
  nome: {
    required: "O nome é um campo obrigatório",
  },
  telefone: {
    required: "O telefone é um campo obrigatório.",
  },
  email: {
    required: "Você precisa informar o e-mail",
    email: "Insira um e-mail válido",
  },
  valor: {
    required: "O valor é um campo obrigatório",
  },
};

export const ALERT_DELETE_ITEM = {
  title: "Você tem certeza que deseja apagar esse item?",
  body: "Essa ação não pode ser desfeita.",
  confirmButton: "Deletar",
};
