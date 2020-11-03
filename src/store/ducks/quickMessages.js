import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  createQuickMessagesRequest: ["data"],
  createQuickMessagesSuccess: null,
  getQuickMessagesRequest: null,
  getQuickMessagesSuccess: ["data"],
  loadingFalse: null,
});

export const QuickMessagesType = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  quickMessages: [],
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_QUICK_MESSAGES_REQUEST]: (state) =>
    state.merge({ loading: true }),
  [Types.CREATE_QUICK_MESSAGES_SUCCESS]: (state) =>
    state.merge({ loading: true }),
  [Types.GET_QUICK_MESSAGES_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.GET_QUICK_MESSAGES_SUCCESS]: (state, action) =>
    state.merge({ loading: true, quickMessages: action.data }),
  [Types.LOADING_FALSE]: (state) => state.merge({ loading: false }),
});
