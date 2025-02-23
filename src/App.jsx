import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '../src/context/StoreContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import ProductDisplay from './components/product/ProductDisplay';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import Admin from './pages/Admin';

function App() {
  return (
    <Provider store={store}>
      <StoreProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/product/:id" element={<ProductDisplay />} />
              {/* <Route path="/admin" element={<Admin />} /> */}
            </Routes>
          </Layout>
        </Router>
      </StoreProvider>
    </Provider>
  );
}

export default App; 