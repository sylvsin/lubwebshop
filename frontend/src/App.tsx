import React from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">lubwebshop</Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
