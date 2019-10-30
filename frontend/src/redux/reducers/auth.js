import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  userName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { userName } = action.payload;
      return {
        ...state,
        userName: userName
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userName: null
      };
    }
    default:
      return state;
  }
}
