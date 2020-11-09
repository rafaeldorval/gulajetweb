import { createReducer, createActions } from 'reduxsauce';
/* Types & Action Creators */

const { Types, Creators } = createActions({
  getProductsRequest: null,
  getProductsSuccess: ['data'],
  saleProductRequest: ['id', 'data'],
  saleProductSuccess: null,
  updateStatusProductRequest: ['id', 'data'],
  updateStatusProductSuccess: null,
  ratingProductRequest: ['id', 'data'],
  ratingProductSuccess: null,
  setProductSelect: ['product'],
  loadingFalse: null,
});

export const ProductsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  productsData: [],
  productData: null,
  ratingFinish: false,
  loading: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.GET_PRODUCTS_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    productsData: data,
  }),
  [Types.SALE_PRODUCT_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.SALE_PRODUCT_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
  [Types.UPDATE_STATUS_PRODUCT_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.UPDATE_STATUS_PRODUCT_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
  [Types.RATING_PRODUCT_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.RATING_PRODUCT_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
    ratingFinish: true,
  }),
  [Types.SET_PRODUCT_SELECT]: (state = INITIAL_STATE, { product }) => ({
    ...state,
    productData: product,
    loading: false,
  }),
  [Types.LOADING_FALSE]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
