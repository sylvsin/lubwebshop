import React, {
  createContext,
  useReducer,
} from 'react';

interface IStore {
  state?: any;
  dispatch?: any;
}

export const Store = createContext<IStore>({});

type Props = {
  children: React.ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // Add To Cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: any) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };

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
  // const value = { state, dispatch };

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
