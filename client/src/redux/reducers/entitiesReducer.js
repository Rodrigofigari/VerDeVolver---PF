import {
  FETCH_ENTITIES,
  SEARCH_ENTITIES,
  CREATE_NEW_ENTITY,
  GET_MATERIALS,
  FILTER_ENTITIES_BY_MATERIAL,
  LIST_OF_MATERIALS_TO_FILTER,
  SORT_ENTITIES_BY_RANKING,
  GET_ENTITY_BY_ID,
  GET_ENTITY_FEEDBACKS,
  GET_ENTITY_DONATIONS,
} from '../actions/entitiesActions';

const initialState = {
  entities: [],
  entity: {},
  feedbacks: [],
  donations: [],
  message: '',
  materials: [],
  filteredEntities: [],
  listOfMaterialsToFilterState: [],
};
export const entitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ENTITIES:
      return { ...state, entities: payload, filteredEntities: payload };
    case SEARCH_ENTITIES:
      return {
        ...state,
        entities: payload,
      };
    case GET_ENTITY_BY_ID:
      return { ...state, entity: payload };
    case CREATE_NEW_ENTITY:
      return { ...state, message: payload };
    case GET_MATERIALS:
      return { ...state, materials: payload };
    case FILTER_ENTITIES_BY_MATERIAL:
      return { ...state, filteredEntities: [...payload] };
    case LIST_OF_MATERIALS_TO_FILTER:
      return { ...state, listOfMaterialsToFilterState: [...payload] };
    case SORT_ENTITIES_BY_RANKING:
      const sortedEntities =
        action.payload === '1'
          ? state.filteredEntities.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            })
          : state.filteredEntities.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              return 0;
            });
      return {
        ...state,
        filteredEntities: [...sortedEntities],
      };
    case GET_ENTITY_FEEDBACKS:
      return { ...state, feedbacks: payload };
    case GET_ENTITY_DONATIONS:
      return { ...state, donations: payload };
    default:
      return { ...state };
  }
};
