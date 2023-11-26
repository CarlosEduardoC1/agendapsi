export type FormValues = {
  pacient: number;
  session_value: string;
  date_time: string;
  showUp?: boolean;
  payed?: boolean;
};

export type Select = {
  label: string;
  value: string;
};

export type List<T> = T[];
