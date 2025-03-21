import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password, accessType,picturePath) => (dispatch) => {
  return AuthService.register(username, email, password, accessType,picturePath).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      console.log(data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data.user },
      });
      return data.data
    },
    (error) => {
      console.log(error)
      const message = error.response;
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return error
    }
  );
};

export const logout = (userId) => (dispatch) => {
  AuthService.logout(userId);
  dispatch({
    type: LOGOUT,
  });
};
