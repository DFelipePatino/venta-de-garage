import { products } from '../data/products';

const initialState = {
  selectedProduct: products[0],
  productsEndPoint: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'product/setSelectedProduct':
      return {
        ...state,
        selectedProduct: action.payload
      };
    case 'GET_PRODUCTS':
      return {
        ...state,
        // products: [...state.products, ...action.payload]
        productsEndPoint: action.payload
      };
    default:
      return state;
  }
};

export default productReducer; 