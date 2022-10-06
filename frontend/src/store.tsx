import React, {
  createContext,
  useReducer,
} from 'react';

export const Store = createContext({});

type Props = {
  children: React.ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // Add To Cart
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
};

const initialState = {
  cart: {
    cartItems: [],
  },
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={{ value }}>{children}</Store.Provider>;
};

export default StoreProvider;
