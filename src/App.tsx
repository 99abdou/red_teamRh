import { Routes, Route } from 'react-router-dom';
import LayoutEmploye from './components/LayoutEmploye';
import Dashboard from './pages/Dashboard';
import DemandeConge from './pages/DemandeConge';
import Historique from './pages/Historique';
import SoldeConge from './pages/SoldeConge';
import LoginPage from './pages/loginEmploye/Login-page';

const App = () => (
  <Routes>
    
    <Route path="/login" element={<LoginPage />} />
    
    {/* Routes protégées avec layout */}
    <Route path="/" element={<LayoutEmploye />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="demande" element={<DemandeConge />} />
      <Route path="historique" element={<Historique />} />
      <Route path="solde" element={<SoldeConge />} />
      <Route path="*" element={<LoginPage />} />
    </Route>
  </Routes>
);

export default App;