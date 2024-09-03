import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ProductForm from './components/ProductForm'; 
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="*" element={<NotFound />} /> {/* Handles unmatched routes */}
      </Routes>
    </Router>
  );
};

export default App;
