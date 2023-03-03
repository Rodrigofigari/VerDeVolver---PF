import { FETCH_USERS, CREATE_NEW_CONTACT, GET_USER_DONATIONS, GET_USER_FEEDBACKS } from '../actions/usersActions';

const initialState = {
  users: [],
  contact: [],
  donations: [],
  feedbacks: [],
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, users: payload };
    case CREATE_NEW_CONTACT:
      console.log(state.contact);
      return { ...state, contact: [...state.contact, payload] };
    case GET_USER_DONATIONS:
      return { ...state, donations: payload };
    case GET_USER_FEEDBACKS:
      return { ...state, feedbacks: payload };
    default:
      return { ...state };
  }
};
