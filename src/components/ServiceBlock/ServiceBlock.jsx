import React from 'react'
import styles from './serviceBlock.module.scss';
import servicesImg from '../../assets/images/services.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ServiceBlock = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    console.log(isAuthenticated, 'АВторизован?');

    return (
        <section className={styles.service}>
            <div className={styles.serviceContent} >
                <h1 className={styles.serviceTitle}>сервис по поиску публикаций о компании по его ИНН</h1>
                <h6 className={styles.subtitle} >
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </h6>

                {isAuthenticated && <Link to="/search" className={styles.serviceBtn} >Запросить данные</Link>}
            </div>
            <div className={styles.serviceVisuial}>
                <img className={styles.serviceImg} src={servicesImg} alt="servicesImg" />
            </div>
        </section>
    )
}

export default ServiceBlock