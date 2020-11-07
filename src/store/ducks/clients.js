import { createReducer, createActions } from "reduxsauce";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  getClientsRequest: null,
  getClientsSuccess: ['data'],
  loadingFalse: null,
});

export const ClientsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  clientsData: [],
  loading: false,
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CLIENTS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true
  }),
  [Types.GET_CLIENTS_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    clientsData: data
  }),
  [Types.LOADING_FALSE]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false
  }),
});
