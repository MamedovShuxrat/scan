import React, { useEffect, useState } from 'react'
import styles from './loginForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../store/slices/authSlice'
import toast from 'react-hot-toast'

import googleIcon from '../../../assets/icons/login/google.svg'
import facebookIcon from '../../../assets/icons/login/facebook.svg'
import yndIcon from '../../../assets/icons/login/ynd.svg'
import eyesIcon from '../../../assets/icons/login/eye.svg'
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
            console.log(loginfield, password)
            dispatch(login({ login: loginfield, password: password }))

        } else {
            console.log('ошибка где-то тут');
        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-lr font-medium text-gray-900">
                                Внимание! Функция регистрации временно недоступна.
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Для входа в систему вы можете использовать следующий аккаунт:
                            </p>
                            <p className="text-lr font-medium text-gray-900">
                                Логин: sf_student1
                            </p>
                            <p className="text-lr font-medium text-gray-900">
                                Пароль: 4i2385j
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ))
    }

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
            </>
            )}

        </form>
    )
}

export default LoginForm