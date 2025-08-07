import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiClock, FiList, FiLogOut, FiBookOpen, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/demande', icon: FiClock, label: 'Demander congé' },
    { path: '/historique', icon: FiList, label: 'Historique' },
    { path: '/solde', icon: FiBookOpen, label: 'Solde de congé' },
  ];

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex flex-col fixed z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
        w-64
      `}>
        {/* En-tête */}
        <div className="p-6 text-center font-bold text-xl border-b border-purple-600/30">
          <div className="flex items-center justify-between lg:justify-center">
            <span className="lg:hidden">Menu</span>
            <span className="hidden lg:block">Espace Employé</span>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-1 hover:bg-blue-700 rounded"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isActive(item.path) 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                    : 'hover:bg-purple-700/50 text-purple-100 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div className="px-4 py-4 border-t border-purple-600/30">
          <button 
            className="flex items-center space-x-3 w-full p-3 hover:bg-red-600 rounded-lg cursor-pointer transition-colors text-red-100 hover:text-white"
            onClick={() => {
              // Logique de déconnexion ici
              console.log('Déconnexion');
              closeSidebar();
            }}
          >
            <FiLogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
