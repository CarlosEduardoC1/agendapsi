import { Dispatch } from "react";

import { Tabs } from "../../@types";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  ACTIVE_TAB = "ACTIVE_TAB",
  ACTIVE_TAB_CALLBACK = "ACTIVE_TAB_CALLBACK",
  REMOVE_TAB_CALLBACK = "REMOVE_TAB_CALLBACK",
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
      // payload: any;
    };

export interface GlobalState {
  activeTab: Tabs;
  onPressActiveTab: any;
}

export type GlobalContextProps = ContextProps<GlobalState, Actions>;
