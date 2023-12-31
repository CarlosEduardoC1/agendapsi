export type Response<T = null> = {
  status: number;
  message: string;
  data?: T;
};

export type Pacient = {
  nome: string;
  email: string;
  telefone: string;
  valor: string;
  id?: number;
};

export type Sessions = {
  id?: number;
  id_paciente: number;
  schedule_date: Date;
  payed: boolean;
  executed: boolean;

  //MOEDAS
  sessionValue: any;
  received: any;
  toReceive: any;
};

export type Users = {
  id?: number;
  imagem?: string;
  email: string;
  nome: string;
};

export type Tables = "pacient" | "users" | "sessions";

export type Tabs = "schedule" | "pacient" | "financy";

export type Mode = "event" | "list";

export type SupportedModes = "tel" | "mailto" | "whatsapp";

export type Schedule<T> = T[];

export type Errors<T> = {
  [k in keyof T]: {
    required: string;
    [K: string]: string;
  };
};

export type Months =
  | "Jan"
  | "Fev"
  | "Mar"
  | "Abr"
  | "Mai"
  | "Jun"
  | "Jul"
  | "Ago"
  | "Set"
  | "Out"
  | "Nov"
  | "Dez";

export type SessionMode = "received" | "toreceive";
