import React, { useEffect, useState } from 'react'
import styles from './loginForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../store/slices/authSlice'

import googleIcon from '../../../assets/icons/login/google.svg'
import facebookIcon from '../../../assets/icons/login/facebook.svg'
import yndIcon from '../../../assets/icons/login/ynd.svg'
import eyesIcon from '../../../assets/icons/login/eye.svg'
import ModalInfo from './ModalInfo'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const [loginfield, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isButtonDisabled, setIsbuttonDisabled] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (loginfield.trim() !== '' && password.trim() !== '') {
            setIsbuttonDisabled(false)
        } else {
            setIsbuttonDisabled(true)
        }
    }, [loginfield, password])

    const [isLogin, setIsLogin] = useState(true)
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (loginfield && password) {
            dispatch(login({ login: loginfield, password: password }))

        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleSwitchForm = () => {
        setIsLogin(!isLogin)
    }

    return (
        <form className={styles.form}>
            <div className={styles.formTop}>
                <span
                    onClick={handleSwitchForm}
                    className={`${styles.formLinkLogin} ${isLogin ? styles.active : ''}`}>
                    Войти
                </span>
                <span onClick={handleSwitchForm}
                    className={`${styles.formLinkRegister} ${!isLogin ? styles.active : ''}`}>
                    Зарегистрироваться
                </span>
            </div>
            {isLogin ? (<> <div className={styles.formInputs}>
                <label>Логин или номер телефона:</label>
                <input
                    type="text"
                    value={loginfield}
                    onChange={handleLoginChange}
                    placeholder='+79126532142'
                    className={styles.formInput}
                    required
                />
            </div>
                <div className={styles.formInputs}>
                    <label>Пароль:</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            className={`${styles.formInputPassword} ${styles.formInput}`}
                            required
                        />
                        <img onClick={handleShowPassword} className={styles.isShowPassword} src={eyesIcon} alt="eyesIcon" />
                    </div>
                </div>
                <button
                    className={`${styles.loginBtn} ${isButtonDisabled ? styles.disabled : ''}`}
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}>
                    Войти
                </button>
                <a href="#" className={styles.loginRecover}>Восстановить пароль</a>
                <div className={styles.loginWith}>
                    <span>Войти через:</span>
                    <div className={styles.socialLogin}>
                        <a href="#">
                            <img src={googleIcon} alt="googleIcon" />
                        </a>
                        <a href="#">
                            <img src={facebookIcon} alt="facebookIcon" />
                        </a>
                        <a href="#">
                            <img src={yndIcon} alt="yndIcon" />
                        </a>
                    </div>
                </div>
            </>
            ) : (<>
                <div className={styles.formInputs}>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        name="name"
                        placeholder='Введите имя'
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formInputs}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        name="email"
                        placeholder='Введите почту'
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formInputs}>
                    <label>Пароль:</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            name="password"
                            placeholder='Введите пароль'
                            className={`${styles.formInputPassword} ${styles.formInput}`}
                            required
                        />
                        <img
                            className={styles.isShowPassword}
                            src={eyesIcon}
                            alt="eyesIcon"
                            onClick={handleShowPassword}
                        />
                    </div>
                </div>
                <button className={styles.loginBtn} onClick={handleRegisterSubmit}>
                    Зарегистрироваться
                </button>
                <ModalInfo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </>
            )}

        </form>
    )
}

export default LoginForm

