import { combineReducers } from "redux";

import { reducer as user } from "./user";
import { reducer as clients } from "./clients";

const reducers = combineReducers({
  user,
  clients
});

export default reducers;
