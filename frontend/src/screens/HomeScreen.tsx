import React from 'react';

import { Link } from 'react-router-dom';

import data from '../data';

const HomeScreen: React.FC = () => {
  return (
    <div>
      <h1>T-Shirts</h1>
      <div className="products">
        {data.products.map((product) => {
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
        })}
      </div>
    </div>
  );
};

export default HomeScreen;
