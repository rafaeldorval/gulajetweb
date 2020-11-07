import {call, put} from 'redux-saga/effects'
import ClientsActions from '../ducks/clients'

import api from '../../services/api'

export function* getClients() {
  try {
    const { data } = yield call(api.get, '/clients')
    return yield put(ClientsActions.getClientsSuccess(data))
  } catch (error) {
    return yield put(ClientsActions.loadingFalse())
  }
}
