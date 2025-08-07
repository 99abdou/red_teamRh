import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function LayoutEmploye() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen lg:ml-64">
        <Navbar />
        <main className="pt-20 px-4 lg:px-6 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
