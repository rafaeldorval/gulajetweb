import { combineReducers } from "redux";

import { reducer as user } from "./user";
import { reducer as chat } from "./chat";
import { reducer as quickMessages } from "./quickMessages";

const reducers = combineReducers({
  user,
  chat,
  quickMessages,
});

export default reducers;
