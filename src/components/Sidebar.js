import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChartPieIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyBangladeshiIcon,
  GlobeAsiaAustraliaIcon as GlobeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Logo from './Logo';
import { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import AccountContext from '../contexts/account-data';

export default function Sidebar() {
  const route = useLocation();
  const account = useContext(AccountContext);

  const [showSidebar, setShowSidebar] = useState(
    localStorage.getItem('showSidebar') === 'true' ? true : false
  );

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
    localStorage.setItem('showSidebar', !showSidebar);
  };

  const logoutUser = () => {
    account.resetAccountData();
  };

  return (
    <div className="relative z-10 h-screen text-sm border-r w-max bg-content border-white/10">
      {!showSidebar && <Tooltip id="my-tooltip" />}
      <ul
        className={`flex flex-col h-full gap-2 text-white/70 p-4 ${
          showSidebar ? 'w-60' : 'w-max'
        }`}
      >
        <li className="flex items-center gap-4 p-2 font-bold text-white uppercase rounded-lg">
          <Logo className="h-8" />
          {showSidebar && <span className="font-bold ">metaland</span>}
          <button
            className="absolute right-0 flex items-center justify-center w-5 h-5 -space-x-1 translate-x-1/2 bg-white border rounded-full border-white/10 hover:bg-content hover:border-px hover:text-white text-content"
            onClick={handleShowSidebar}
            type="button"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Toggle Sidebar"
            data-tooltip-place="right"
          >
            {showSidebar ? (
              <>
                <ChevronRightIcon className="h-2" />
                <ChevronLeftIcon className="h-2" />
              </>
            ) : (
              <>
                <ChevronLeftIcon className="h-2" />
                <ChevronRightIcon className="h-2" />
              </>
            )}
          </button>
        </li>
        <div className="w-full h-px bg-white/10"></div>
        {/*<li>
          <NavLink
            to="/"
            className={`flex items-center gap-4 p-2 uppercase rounded-lg hover:bg-black/40 ${
              route.pathname === '/' && 'bg-black text-white'
            }`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Dashboard"
            data-tooltip-place="right"
          >
            <ChartPieIcon className="h-8" />
            {showSidebar && <span className="">dashboard</span>}
          </NavLink>
        </li>*/}
        <li>
          <NavLink
            to="/gallery"
            className={`flex items-center gap-4 p-2 uppercase rounded-lg hover:bg-black/40 ${
              route.pathname === '/gallery' && 'bg-black text-white'
            }`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Gallery"
            data-tooltip-place="right"
          >
            <GlobeIcon className="h-8" />
            {showSidebar && <span className="">gallery</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={`flex items-center gap-4 p-2 uppercase rounded-lg hover:bg-black/40 ${
              route.pathname === '/transactions' && 'bg-black text-white'
            }`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Transactions"
            data-tooltip-place="right"
          >
            <CurrencyBangladeshiIcon className="h-8" />
            {showSidebar && <span className="">transactions</span>}
          </NavLink>
        </li>
        <li className="flex flex-col gap-4 mt-auto">
          <button
            className="flex items-center gap-4 p-2 uppercase rounded-lg hover:bg-black/40"
            onClick={logoutUser}
            type="button"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Logout"
            data-tooltip-place="right"
          >
            {showSidebar ? (
              <>
                <ArrowLeftOnRectangleIcon className="h-8" />
                <span className="">Logout</span>
              </>
            ) : (
              <ArrowRightOnRectangleIcon className="h-8" />
            )}
          </button>
          <div className="w-full h-px bg-white/10"></div>
          <div>
            <NavLink
              to="/profile"
              className={`flex items-center gap-4 p-2 uppercase rounded-lg hover:bg-black/40 ${
                route.pathname === '/profile' && 'bg-black text-white'
              }`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Profile"
              data-tooltip-place="right"
            >
              <UserCircleIcon className="h-8" />
              {showSidebar && <span className="">profile</span>}
            </NavLink>
          </div>
        </li>
      </ul>
    </div>
  );
}
