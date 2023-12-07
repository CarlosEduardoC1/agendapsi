import { Dispatch } from "react";

import { Pacient, Tabs } from "../../@types";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  ACTIVE_TAB = "ACTIVE_TAB",
  ACTIVE_TAB_CALLBACK = "ACTIVE_TAB_CALLBACK",
  SHOW_REGISTER_PAGE = "SHOW_REGISTER_PAGE",
  SET_LOGGED = "SET_LOGGED"

}

export type Actions =
  | {
      type: ActionTypes.ACTIVE_TAB;
      payload: Tabs;
    }
  | {
      type: ActionTypes.ACTIVE_TAB_CALLBACK;
      payload: any;
    }
  | {
      type: ActionTypes.SHOW_REGISTER_PAGE;
      payload: boolean;
    }
    | {
      type: ActionTypes.SET_LOGGED,
      payload: boolean;
    };

export interface GlobalState {
  activeTab: Tabs;
  onPressActiveTab: any;
  registerPage: boolean;
  isLogged: boolean;
}

export type GlobalContextProps = ContextProps<GlobalState, Actions>;
