import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <figure>
          <img src="/images/cinema-sphere-logo.png" alt="Logo" />
        </figure>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({isActive}) => (isActive ? "active" : "")}>About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}