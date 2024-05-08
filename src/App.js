import React from "react";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/CartPage/Cart";
import Footer from "./pages/Footer";
import Error404 from "./pages/Error404";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'



const router = createBrowserRouter([
  {
    element: <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/cart',
        element: <Cart />
      },
    ],
    errorElement: <Error404 />
  }
])



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
