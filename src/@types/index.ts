export type Response<T = null> = {
  status: number;
  message: string;
  data?: T;
};

export type Pacient = {
  nome: string;
  email: string;
  telefone: string;
  valor: number;
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

export type Schedule<T> = T[];