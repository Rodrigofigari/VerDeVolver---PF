import { FETCH_USERS, ACTUAL_USER } from '../actions/usersActions';

const initialState = {
  users: [],
  actualUserMail: [],
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, users: payload };
    case ACTUAL_USER:
      return { ...state, actualUserMail: payload };
    default:
      return { ...state };
  }
};
