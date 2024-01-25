import React, { useEffect } from 'react';
import './style.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/slices/cateroriesSlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
