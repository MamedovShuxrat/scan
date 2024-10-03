import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss'
import mainLogo from '../../assets/icons/main-logo.svg';
import LoginWindow from '../Auth/LoginWindow';
import UserWindow from '../Auth/UserWindow';
const Header = () => {
    const isAuth = false;

    return (
        <div className="container">
            <header className={styles.header}>
                <Link to="/">
                    <img width={110} height={110} src={mainLogo} alt="main logo" />
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navWrapper}>
                        <li className={styles.navItem}>
                            <Link to="/">Главная</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/tariffs">Тарифы</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/faq">FAQ</Link>
                        </li>
                    </ul>
                </nav>

                {isAuth ? <UserWindow /> : <LoginWindow />}
            </header >
        </div>
    );
};

export default Header;
