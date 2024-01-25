import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import BasketPage from './pages/BasketPage';
import SingleProductPage from './pages/SingleProductPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },

        {
          path: '/products',
          element: <ProductsPage />,
        },

        {
          path: '/products/:id',
          element: <SingleProductPage />,
        },

        {
          path: '/sales/:AllSales',
          element: <ProductsPage />,
        },

        {
          path: '/basket',
          element: <BasketPage />,
        },

        {
          path: '/categories',
          element: <CategoriesPage />,
        },

        {
          path: '/categories/:categoryTitle/:categoryID',
          element: <ProductsPage />,
        },

        {
          path: '/*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],

  {
    basename: '/',
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
