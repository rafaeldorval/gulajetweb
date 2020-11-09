import { createReducer, createActions } from 'reduxsauce';
/* Types & Action Creators */

const { Types, Creators } = createActions({
  getClientsRequest: null,
  getClientsSuccess: ['data'],
  getClientDataRequest: ['id'],
  getClientDataSuccess: ['data'],
  creditOperationRequest: ['id', 'data'],
  creditOperationSuccess: null,
  updateStatusClientRequest: ['id', 'status'],
  updateStatusClientSuccess: null,
  loadingFalse: null,
});

export const ClientsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  clientsData: [],
  clientData: null,
  loading: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CLIENTS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.GET_CLIENTS_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    clientsData: data,
  }),
  [Types.GET_CLIENT_DATA_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.GET_CLIENT_DATA_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    clientData: data,
  }),
  [Types.CREDIT_OPERATION_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.CREDIT_OPERATION_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
  [Types.UPDATE_STATUS_CLIENT_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.UPDATE_STATUS_CLIENT_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
  [Types.LOADING_FALSE]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
