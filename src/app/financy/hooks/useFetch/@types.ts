import { Months, Sessions } from "../../../../@types";

export type UseFetch = {
  onGetToReceive: (m: Months) => Promise<any[]>;
  onGetReceived: (m: Months) => Promise<any[]>;
  onGetNotPayed: () => Promise<Sessions[]>;
};
