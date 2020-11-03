import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { USERDATA_KEY } from "../../services/auth";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  setUserData: ["data"],
  loadingFalse: null,
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  userdata: JSON.parse(sessionStorage.getItem(USERDATA_KEY)) || {},
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_DATA]: (state, action) => {
    return state.merge({ loading: true, userdata: action.data });
  },
  [Types.LOADING_FALSE]: (state) => state.merge({ loading: false }),
});
