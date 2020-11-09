import { combineReducers } from 'redux';

import { reducer as user } from './user';
import { reducer as clients } from './clients';
import { reducer as products } from './products';

const reducers = combineReducers({
  user,
  products,
  clients,
});

export default reducers;
