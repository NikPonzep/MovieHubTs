import { Link } from 'react-router-dom';
import { Home, Film, Bookmark } from 'lucide-react';

import styles from './Header.module.css';

interface HeaderProps {
  moviecount: number;
}

function Header({ moviecount }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MovieHub
      </Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <Home
            size={30}
            strokeWidth={2} 
            />
          <span>Главная</span>
        </Link>

        <Link to="/movies" className={styles.link}>
          <Film />
          <span>Фильмы</span>
        </Link>

        <Link to="/watchlist" className={styles.link}>
          <Bookmark />
          <span>Мой список</span>
        </Link>
      </nav>

      <div className={styles.movie}>
        <p>Фильмов: {moviecount}</p>
      </div>
    </header>
  );
}

export default Header;