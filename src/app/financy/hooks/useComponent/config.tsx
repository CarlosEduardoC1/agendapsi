import { State } from "./@types";

export const INITIAL_STATE: State = {
  chartData: [],
  oppenedSessions: [],
};


export const OPTIONS = () => {
  return {
      title: 'Financeiro',
      headerRight: () => <></>
  }
}