import { all, takeLatest } from "redux-saga/effects";

import {ClientsTypes} from '../ducks/clients'
import {getClients} from './clients'

export default function* rootSaga() {
  yield all([
    takeLatest(ClientsTypes.GET_CLIENTS_REQUEST, getClients)
  ]);
}
