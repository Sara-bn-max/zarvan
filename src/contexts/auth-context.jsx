import React, { useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatcherContext = React.createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw Error("useAuthState must be used with AuthProvider");
  }
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatcherContext);

  if (!context) {
    throw Error("useAuthDispatch must be used with AuthProvider");
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatcherContext.Provider value={dispatch}>
        {children}
      </AuthDispatcherContext.Provider>
    </AuthStateContext.Provider>
  );
}
