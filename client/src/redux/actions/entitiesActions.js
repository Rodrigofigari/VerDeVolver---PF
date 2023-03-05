import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const SEARCH_ENTITIES = 'SEARCH_ENTITIES';
export const GET_ENTITY_BY_ID = 'GET_ENTITY_BY_ID';
export const GET_ENTITY_FEEDBACKS = 'GET_ENTITY_FEEDBACKS';
export const CREATE_NEW_ENTITY = 'CREATE_NEW_ENTITY';
export const GET_MATERIALS = 'GET_MATERIALS';
// export const FILTER_BY_MATERIALS = 'FILTER_BY_MATERIALS';
export const FILTER_ENTITIES_BY_MATERIAL = 'FILTER_ENTITIES_BY_MATERIAL';
export const LIST_OF_MATERIALS_TO_FILTER = 'LIST_OF_MATERIALS_TO_FILTER';
export const SORT_ENTITIES_BY_RANKING = 'SORT_ENTITIES_BY_RANKING';
export const GET_ENTITY_DONATIONS = 'GET_ENTITY_DONATIONS';

export const getEntityDonation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/donation/vdv/${id}`);
      return dispatch({ type: GET_ENTITY_DONATIONS, payload: res.data });
    } catch (error) {
      return dispatch({ type: GET_ENTITY_DONATIONS, payload: error.message });
    }
  };
};

export const fetchEntities = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/vdv');
      const entities = res.data;

      dispatch({ type: FETCH_ENTITIES, payload: entities });
    } catch (error) {}
  };
};

export const searchEntities = (search) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/vdv?name=${search}`);
    const entities = res.data;

    dispatch({ type: SEARCH_ENTITIES, payload: entities });
  };
};

export const getEntityById = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/vdv/${id}`);
    const entity = res.data;

    dispatch({ type: GET_ENTITY_BY_ID, payload: entity });
  };
};

export const getEntityFeedbacks = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/feedback/vdv/${id}`);
    const feedbacks = res.data;

    dispatch({ type: GET_ENTITY_FEEDBACKS, payload: feedbacks });
  };
};

export const createNewEntity = (entity) => {
  return async function (dispatch) {
    try {
      const res = await axios.post('http://localhost:3001/vdv', entity);
      const message = res.data;
      dispatch({ type: CREATE_NEW_ENTITY, payload: message });
      alert(
        'Muchas gracias por completar tus datos! Nos pondremos en contacto vía email.'
      );
    } catch (error) {
      alert(error.message);
      dispatch({ type: CREATE_NEW_ENTITY, payload: error.message });
    }
  };
};

export const getMaterials = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/material');
      //const materials = response.data.map((m) => m.name);---esto lo subio juan, lo dejamos comentado por si le servia para algo

      const materials = response.data;
      dispatch({ type: GET_MATERIALS, payload: materials });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const filterEntitiesByMaterial = (material) => {
  return async function (dispatch) {
    dispatch({ type: FILTER_ENTITIES_BY_MATERIAL, payload: material });
  };
};

export const listOfMaterialsToFilter = (materials) => {
  return {
    type: LIST_OF_MATERIALS_TO_FILTER,
    payload: materials,
  };
};

export const sortEntitiesByRanking = (order) => {
  return async function (dispatch) {
    dispatch({ type: SORT_ENTITIES_BY_RANKING, payload: order });
  };
};
