import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LayoutEmploye from './components/LayoutEmploye';
import Dashboard from './pages/Dashboard';
import DemandeConge from './pages/DemandeConge';
import Historique from './pages/Historique';
import SoldeConge from './pages/SoldeConge';
import LoginPage from './pages/loginEmploye/Login-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "employe",
        element: <LayoutEmploye />, // Utilisation de layout pour toutes les routes admin
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "demandeConge",
            element: <DemandeConge />,
          },
          {
            path: "historique",
            element: <Historique />,
          },
          {
            path: "solde",
            element: <SoldeConge />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
