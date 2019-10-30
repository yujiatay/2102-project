import { LOGIN, LOGOUT } from "./actionTypes";

export const logIn = userName => ({
  type: LOGIN,
  payload: {
    userName: userName
  }
});

export const logOut = () => ({
  type: LOGOUT
});