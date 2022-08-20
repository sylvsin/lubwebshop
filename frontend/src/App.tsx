import React from 'react';

import data from './data';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <a href="/">lubwebshop</a>
      </header>

      <main>
        <h1>T-Shirts</h1>
        <div className="products">
          {data.products.map((product) => {
            return (
              <div className="product" key={product.slug}>
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                  <a href={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </a>
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
