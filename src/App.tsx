import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Census from "./pages/Census";

const router = createBrowserRouter([
  {
    path: "/censo",
    element: <Census />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
