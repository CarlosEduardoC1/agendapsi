import { Dispatch } from "react";

import { Tabs } from "../../@types";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  ACTIVE_TAB = "ACTIVE_TAB"
}

export type Actions =
  | {
      type: ActionTypes.ACTIVE_TAB;
      payload: Tabs;
    };

export interface GlobalState {
  activeTab: Tabs;
}

export type GlobalContextProps = ContextProps<GlobalState, Actions>;
