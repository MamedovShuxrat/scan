import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss'
import mainLogo from '../../assets/icons/main-logo.svg';
import secondLogo from '../../assets/icons/second-logo.svg';
import LoginWindow from '../Auth/LoginWindow';
import UserWindow from '../Auth/UserWindow';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isAuth = false;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className="container">
            <header className={`${styles.header} ${isMenuOpen ? styles.open : ''}`}>
                <Link to="/">
                    <img className={styles.mainLogo} src={isMenuOpen ? secondLogo : mainLogo} alt="logo" />
                </Link>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navWrapper}>
                        <li className={`${styles.navItem} ${isMenuOpen ? styles.open : ''}`}>
                            <Link to="/">Главная</Link>
                        </li>
                        <li className={`${styles.navItem} ${isMenuOpen ? styles.open : ''}`}>
                            <Link to="/tariffs">Тарифы</Link>
                        </li>
                        <li className={`${styles.navItem} ${isMenuOpen ? styles.open : ''}`}>
                            <Link to="/faq">FAQ</Link>
                        </li>
                    </ul>
                    {isAuth ? <UserWindow isMenuOpen={isMenuOpen} /> : <LoginWindow />}
                </nav>
                <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header >
        </div>
    );
};

export default Header;
