import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
        <div className="header-logo">
            <img src="/src/styles/images/ghost.png" alt="Ghost Logo" />
        </div>
        <nav>
            <Link to='/' className="header-link">Главная</Link>
            <Link to='/about' className="header-link">О нас</Link>
            <Link to='/contact' className="header-link">Контакты</Link>
            <Link to='/feedback' className="header-link">Обратная связь</Link>
        </nav>
    </header>
  );
};

export default Header;