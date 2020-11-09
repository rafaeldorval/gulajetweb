import { all, takeLatest } from 'redux-saga/effects';

import { ClientsTypes } from '../ducks/clients';
import {
  getClients, getClient, creditOperation, statusClient,
} from './clients';

import { ProductsTypes } from '../ducks/products';
import {
  getProducts, saleProduct, statusProduct, ratingProduct,
} from './products';

export default function* rootSaga() {
  yield all([
    takeLatest(ClientsTypes.GET_CLIENTS_REQUEST, getClients),
    takeLatest(ClientsTypes.GET_CLIENT_DATA_REQUEST, getClient),
    takeLatest(ClientsTypes.CREDIT_OPERATION_REQUEST, creditOperation),
    takeLatest(ClientsTypes.UPDATE_STATUS_CLIENT_REQUEST, statusClient),
    takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(ProductsTypes.SALE_PRODUCT_REQUEST, saleProduct),
    takeLatest(ProductsTypes.UPDATE_STATUS_PRODUCT_REQUEST, statusProduct),
    takeLatest(ProductsTypes.RATING_PRODUCT_REQUEST, ratingProduct),
  ]);
}
