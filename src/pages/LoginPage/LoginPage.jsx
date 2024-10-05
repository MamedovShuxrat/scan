import React from 'react'
import styles from './loginPage.module.scss'
import loginBg from '../../assets/images/login-bg.png'
import LoginForm from '../../components/Auth/LoginForm/LoginForm'
const Login = () => {
    return (
        <main className="container">
            <section className={styles.login} >
                <div className={styles.loginContent}>
                    <h2 className={styles.loginTitle}>Для оформления подписки
                        на тариф, необходимо авторизоваться.</h2>
                    <div className={styles.loginFormWrapperMobile}>
                        <LoginForm />
                    </div>
                    <img src={loginBg} alt="lock" className={styles.loginImg} />
                </div>
                <div className={styles.loginFormWrapper}>
                    <LoginForm />
                </div>
            </section>
        </main>
    )
}

export default Login