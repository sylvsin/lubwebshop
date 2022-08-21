import React, {
  useEffect,
  useReducer,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

// import data from '../data';

export interface IProduct {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen: React.FC = () => {
  // const [products, setProducts] = useState<IProduct[]>([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err: any) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>T-Shirts</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product: IProduct) => {
            return (
              <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
