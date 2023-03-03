import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';
export const GET_USER_DONATIONS = 'GET_USER_DONATIONS';
export const GET_USER_FEEDBACKS = 'GET_USER_FEEDBACKS'; 

export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get();
    const users = res.data;

    dispatch({ type: FETCH_USERS, payload: users });
  };
};

export const createNewContact = (contact) => {
  return async function (dispatch) {
    try {
      const res = await axios.post('http://localhost:3001/contact', contact);
      const message = res.data;
      let payload = {
        message,
        contact,
      };
      dispatch({ type: CREATE_NEW_CONTACT, payload: payload.contact });
      alert('Muchas gracias! Nos pondremos en contacto vía email.');
    } catch (error) {
      alert('No pudimos enviar tu comentario.');
      dispatch({ type: CREATE_NEW_CONTACT, payload: error.message });
    }
  };
};

export const getUserDonations = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/donation/user/${id}`);
    const donations = res.data;

    dispatch({ type: GET_USER_DONATIONS, payload: donations });
  };
};

export const getUserFeedbacks = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/feedback/user/${id}`);
    const feedbacks = res.data;

    dispatch({ type: GET_USER_FEEDBACKS, payload: feedbacks });
  };
};
