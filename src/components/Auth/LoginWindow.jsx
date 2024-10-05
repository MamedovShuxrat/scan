import React from 'react'
import { Link } from 'react-router-dom'
import styles from './loginWindow.module.scss'

const LoginWindow = () => {
    return (
        <div className={styles.userView}>
            <Link className={styles.userViewRegister} to='#'>Зарегистрироваться</Link>
            <span></span>
            <Link className={styles.userViewLogin} to='/login'>Войти</Link>
        </div>
    )
}

export default LoginWindow