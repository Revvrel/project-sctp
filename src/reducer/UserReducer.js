import { useReducer } from "react";

const initialState = {
  error: {},
  user: {
    parentName: "",
    parentIC: "",
    phoneNumber: "",
    studentName: "",
    studentIC: "",
    loginEmail: "",
    loginPassword: "",
    repeatPassword: "",
  },
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.value,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.name]: action.message,
        },
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.name]: null,
        },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export { initialState, userReducer };