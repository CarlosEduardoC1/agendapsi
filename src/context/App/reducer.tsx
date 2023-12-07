import React, { createContext, useContext, useReducer } from "react";

import { Actions, ActionTypes, GlobalContextProps, GlobalState } from "./models";

export const initialState: GlobalState = {
  activeTab: "schedule",
  onPressActiveTab: () => { },
  registerPage: false,
  isLogged: false
};

const Context = createContext({} as GlobalContextProps);

const reducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case ActionTypes.ACTIVE_TAB: {
      return { ...state, activeTab: action.payload };
    }
    case ActionTypes.ACTIVE_TAB_CALLBACK: {
      return { ...state, onPressActiveTab: action.payload };
    }
    case ActionTypes.SHOW_REGISTER_PAGE: {
      return { ...state, registerPage: action.payload };
    }
    case ActionTypes.SET_LOGGED: {
      return { ...state, isLogged: action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action}`);
    }
  }
};

type InitialState = {
  globalState?: GlobalState;
};

export const GlobalContextProvider: React.FunctionComponent<
  InitialState & { children: React.ReactNode }
> = ({ children, globalState = initialState }: any) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  const value = { state, dispatch } as GlobalContextProps;
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function GlobalContext() {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch, ActionTypes };
}
