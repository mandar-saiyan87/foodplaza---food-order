import React from "react";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer";
import Error404 from "./pages/Error404";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";




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
    ],
    errorElement: <Error404 />
  }
])

function App() {
  return (
    // <div className="App">
    //   <Navbar />
    //   <Homepage />
    //   <RouterProvider router={router} />
    //   <Footer />
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
