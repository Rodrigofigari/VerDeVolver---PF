import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const ACTUAL_USER = 'ACTUAL_USER';

export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get();
    const users = res.data;

    dispatch({ type: FETCH_USERS, payload: users });
  };
};

export const actualUser = (mail) => {
  return {
    type: ACTUAL_USER,
    payload: mail,
  };
};
