const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 lg:left-64 right-0 z-30">
      <div className="font-bold text-lg lg:text-xl">Tableau de bord</div>
      <div className="flex items-center space-x-2 lg:space-x-3">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-sm lg:text-base">Moussa Diatta</p>
          <p className="text-xs lg:text-sm text-gray-500">Employé</p>
        </div>
        <img
          src="https://ui-avatars.com/api/?name=Moussa+Diatta"
          alt="avatar"
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
