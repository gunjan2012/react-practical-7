import { LOGIN_USER, LOGOUT_USER, STORE_USER } from "../constants";

const initialState = {
  usersData: JSON.parse(localStorage.getItem("usersList")),
  loginUserData: JSON.parse(localStorage.getItem("loginData")),
};

let dataFromStorage;
if (localStorage.getItem("usersList") === null) {
  dataFromStorage = [];
} else {
  dataFromStorage = JSON.parse(localStorage.getItem("usersList"));
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      dataFromStorage.push(action.payload);
      localStorage.setItem("usersList", JSON.stringify(dataFromStorage));
      localStorage.setItem("loginData", JSON.stringify(action.payload));
      return {
        ...state,
        usersData: JSON.parse(localStorage.getItem("usersList")),
      };
    case LOGIN_USER:
      localStorage.setItem("loginData", JSON.stringify(action.payload));
      return {
        ...state,
        loginUserData: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("loginData");
      return {
        ...state,
        loginUserData: null,
      };
    default:
      return {
        ...state,
        usersData: dataFromStorage,
      };
  }
};

export default usersReducer;
