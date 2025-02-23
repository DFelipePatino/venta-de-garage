import { products } from '../data/products';

const initialState = {
  selectedProduct: products[0],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'product/setSelectedProduct':
      return {
        ...state,
        selectedProduct: action.payload
      };
    default:
      return state;
  }
};

export default productReducer; 