import './header.css';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="left">
          <ul>
            <Link to="/">LOGO</Link>
          </ul>
          <ul className="center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="right">
          <Link to="/signin">SignIn</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;