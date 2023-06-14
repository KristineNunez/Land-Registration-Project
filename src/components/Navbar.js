import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/Landing">LANDREG</NavLink>
      </div>

      <div className="menu-icon" onClick={handleShowNavbar}>
        ☰
      </div>
      <div className={`nav-elements  ${showNavbar && 'active'}`}>
        <ul>
          <li>
            <NavLink to="/LandRegForm">Land Registration</NavLink>
          </li>
          <li>
            <NavLink to="">Mortgage</NavLink>
            {/* dropdown */}
            <ul className="dropdown">
              <li className="sub">
                <NavLink to="/MLAppForm">Application</NavLink>
              </li>
              <li className="sub">
                <NavLink to="/MPayForm">Payment</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="">Lease</NavLink>
            {/* dropdown */}
            <ul className="dropdown">
              <li className="sub">
                <NavLink to="/MLAppForm">Application</NavLink>
              </li>
              <li className="sub">
                <NavLink to="/LPayForm">Payment</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/BuyForm">Buy</NavLink>
          </li>
          <li>
            <NavLink to="/SellForm">Sell</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
