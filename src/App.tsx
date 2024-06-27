import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Census from "./pages/Census";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/censo",
    element: <Census />,
  },
]);

function App() {
  return (
    <div className="bg-background">
      <div className="flex items-center justify-between h-full space-y-8 p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bem Vindo, RD AL!
          </h2>
          <p className="text-muted-foreground">
            ⁠"A consequência que o nosso comportamento gera, tende a determinar
            a probabilidade deste comportamento ocorrer novamente."
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/56189229?v=4"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
