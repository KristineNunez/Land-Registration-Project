import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useContext, useEffect, useState } from 'react';

import AccountContext from '../contexts/account-data';

export default function SidebarLayout() {
  const navigate = useNavigate();
  const account = useContext(AccountContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!account.authenticated) {
      navigate('/login');
    } else {
      setMounted(true);
    }
  }, [account, navigate]);

  return (
    <>
      {mounted && (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 min-h-screen pb-6 relative flex flex-col gap-4 px-6 bg-[#1c1b1c] text-white overflow-y-auto max-h-screen @container">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
