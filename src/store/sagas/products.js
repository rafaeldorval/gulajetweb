import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import ProductsActions from '../ducks/products';

import api from '../../services/api';

export function* getProducts() {
  try {
    const { data } = yield call(api.get, '/products');
    return yield put(ProductsActions.getProductsSuccess(data));
  } catch (error) {
    return yield put(ProductsActions.loadingFalse());
  }
}

export function* saleProduct({ id, data }) {
  try {
    const { data: response } = yield call(api.post, `/products-sale/${id}`, data);
    const { data: products } = yield call(api.get, '/products');

    const filterProducts = products.filter((prod) => prod.id === id)[0];
    yield put(ProductsActions.setProductSelect(filterProducts));
    yield put(ProductsActions.getProductsSuccess(products));

    toast.success('Produto vendido com sucesso');
    return yield put(ProductsActions.saleProductSuccess());
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
    }
    return yield put(ProductsActions.loadingFalse());
  }
}

export function* statusProduct({ id, data }) {
  try {
    const { data: response } = yield call(api.post, `/product-status/${id}`, data);
    const { data: products } = yield call(api.get, '/products');

    const filterProducts = products.filter((prod) => prod.id === id)[0];
    yield put(ProductsActions.setProductSelect(filterProducts));
    yield put(ProductsActions.getProductsSuccess(products));

    toast.success('Produto finalizado com sucesso');
    return yield put(ProductsActions.updateStatusProductSuccess(id));
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
    }
    return yield put(ProductsActions.loadingFalse());
  }
}

export function* ratingProduct({ id, data }) {
  try {
    const { data: response } = yield call(api.post, `/product-rating/${id}`, data);

    toast.success('Avaliação realizada com sucesso');
    return yield put(ProductsActions.ratingProductSuccess());
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response);
    }
    toast.error('Erro na avaliação');
    return yield put(ProductsActions.loadingFalse());
  }
}
