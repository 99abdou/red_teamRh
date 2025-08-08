import { useState } from 'react';
import { UIIcons } from './icons';

const Navbar = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Données de l'utilisateur (à remplacer par les vraies données de votre app)
  const userData = {
    name: "Moussa Diatta",
    email: "moussa.diatta@example.com",
    role: "Employé"
  };

  return (
    <>
      <div className="h-16 bg-white shadow flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 lg:left-64 right-0 z-30">
        <div className="font-bold text-lg lg:text-xl">Espace Employé</div>
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Icône de notification */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <UIIcons.Notifications className="w-5 h-5" />
            {/* Badge pour les notifications non lues */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Avatar et nom de l'utilisateur - cliquable pour ouvrir le modal */}
          <button 
            onClick={() => setIsUserModalOpen(true)}
            className="flex items-center space-x-2 lg:space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <img
              src="https://ui-avatars.com/api/?name=Moussa+Diatta"
              alt="avatar"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
            />
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-sm lg:text-base">{userData.name}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Modal des informations utilisateur - positionné en bas de l'avatar */}
      {isUserModalOpen && (
        <>
          {/* Overlay pour fermer le modal */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsUserModalOpen(false)}
          />
          
          {/* Modal positionné en bas de l'avatar */}
          <div className="absolute top-16 right-4 lg:right-2 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="space-y-4">
              {/* Nom */}
              <div>
                <h3 className="text-lg font-semibold">{userData.name}</h3>
                <p className="text-sm text-gray-900">
                    {userData.email}
                  </p>
              </div>
              <div className="border-t border-gray-200  space-y-3">
                {/* Rôle */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Rôle</label>
                  <p className="text-sm text-gray-900">
                    {userData.role}
                  </p>
                </div>
                {/* Bouton Déconnexion */}
                <button
                  className="w-full text-black font-semibold transition-colors hover:text-red-500"
                  onClick={() => {/* TODO: Ajouter la logique de déconnexion ici */}}
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
