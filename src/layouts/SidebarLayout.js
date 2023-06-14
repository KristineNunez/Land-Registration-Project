import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function SidebarLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative flex flex-col gap-4 px-6 bg-[#1c1b1c] text-white overflow-y-auto max-h-screen @container">
        <Outlet />
      </main>
    </div>
  );
}
