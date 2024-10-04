import React from 'react'
import { Link } from 'react-router-dom';
import secondLogo from '../../assets/icons/second-logo.svg';
import styles from './footer.module.scss'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerInner}>
                    <Link to="/">
                        <img className={styles.footerLogo} src={secondLogo} alt="second logo" />
                    </Link>
                    <div className={styles.footerWpapper} >
                        <a className={styles.footerLink} target="_blank" href="https://yandex.ru/maps/-/CDTsq2P4">г. Москва, Цветной б-р, 40 </a>
                        <a className={styles.footerLink} href="tel:+74957712111">+7 495 771 21 11 </a>
                        <a className={styles.footerLink} href="mailto:info@skan.ru">info@skan.ru</a>
                        <span >Copyright. 2024</span>
                    </div>

                </div>
                <div className={styles.footerCopy} >Фронтенд частью проекта занимался я
                    <a href="https://github.com/MamedovShuxrat" target="_blank" class="footer__desc_accent">
                        Мамедов Шухрат
                    </a>  , с целью
                    продемонстрировать мои навыки и знания в области веб-разработки. Сайт предназначен для
                    ознакомления работодателя с моими способностями и подходом к созданию веб-приложений.
                </div>
            </div>
        </footer >
    )
}

export default Footer