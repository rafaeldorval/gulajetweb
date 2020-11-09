import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import ClientsActions from '../ducks/clients';

import api from '../../services/api';

export function* getClients() {
  try {
    const { data } = yield call(api.get, '/clients');
    return yield put(ClientsActions.getClientsSuccess(data));
  } catch (error) {
    return yield put(ClientsActions.loadingFalse());
  }
}

export function* getClient({ id }) {
  try {
    const { data } = yield call(api.get, `/products-client/${id}`);
    return yield put(ClientsActions.getClientDataSuccess(data));
  } catch (error) {
    return yield put(ClientsActions.loadingFalse());
  }
}

export function* creditOperation({ id, data }) {
  try {
    const { data: response } = yield call(api.post, `/credit-client/${id}`, data);
    yield put(ClientsActions.getClientDataRequest(id));
    toast.success('Operação realizada com sucesso');
    return yield put(ClientsActions.creditOperationSuccess());
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        toast.error('O valor informado é maior do total do cliente');
        return yield put(ClientsActions.loadingFalse());
      }
    }
    return yield put(ClientsActions.loadingFalse());
  }
}

export function* statusClient({ id, status }) {
  try {
    const { data: response } = yield call(api.post, `/client-status/${id}`, { status });
    yield put(ClientsActions.getClientDataRequest(id));
    toast.success('Status cliente atualizado com sucesso');
    return yield put(ClientsActions.updateStatusClientSuccess());
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
    }
    return yield put(ClientsActions.loadingFalse());
  }
}
