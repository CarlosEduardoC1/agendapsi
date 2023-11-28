import { Dispatch } from "react";

import { Pacient, Tabs } from "../../@types";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  ACTIVE_TAB = "ACTIVE_TAB",
  ACTIVE_TAB_CALLBACK = "ACTIVE_TAB_CALLBACK",
  REMOVE_TAB_CALLBACK = "REMOVE_TAB_CALLBACK",
  EDIT_PACIENT_NAME = "EDIT_PACIENT_NAME",
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
      type: ActionTypes.REMOVE_TAB_CALLBACK;
    }
  | {
      type: ActionTypes.EDIT_PACIENT_NAME;
      payload: Pacient;
    };

export interface GlobalState {
  activeTab: Tabs;
  onPressActiveTab: any;
  editPacientName: Pacient;
}

export type GlobalContextProps = ContextProps<GlobalState, Actions>;
