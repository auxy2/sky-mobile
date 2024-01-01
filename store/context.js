import React from "react";
import { createContext } from "react";

export const Context = createContext({
  //states
  name: "",
  token: "",
  username: "",
  wallet_Balance: "",
  email: "",
  hashEmail: "",
  hashNumber: "",
  isAuthenticated: false,

  //functions
  authenticate: (token) => {},
  saveCredential: (payload) => {},
  logout: () => {},
});
