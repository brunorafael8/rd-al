import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Census from "./pages/Census";
import Home from "./pages/Home";
import Logo from "./assets/logo.jpg";

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
    <div className="w-full flex items-center justify-center">
      <div className="bg-background max-w-[1440px] self-center w-full">
        <div className="flex items-center justify-between h-full space-y-8 p-8 pb-0">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight cursor-pointer"
              onClick={() => router.navigate("/")}
            >
              Bem Vindo, RD AL!
            </h2>
            <p className="text-muted-foreground">
              ⁠"A consequência que o nosso comportamento gera, tende a
              determinar a probabilidade deste comportamento ocorrer novamente."
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="logo"
              className="w-20 h-20 rounded-full object-cover cursor-pointer"
              onClick={() => router.navigate("/")}
            />
          </div>
        </div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
