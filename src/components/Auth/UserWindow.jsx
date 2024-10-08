import React from 'react'
import styles from './loginWindow.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import UserInfoLoader from '../utils/userInfoLoader'
import avatar from '../../assets/images/avatar.jpg'

const UserWindow = ({ isMenuOpen }) => {
    const limitOnCompanies = useSelector((state) => state.companyLimits.usedCompanyCount)
    const usedByCompanies = useSelector((state) => state.companyLimits.companyLimit)
    const loading = useSelector((state) => state.companyLimits.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlelogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <div className={styles.userWindow}>
            <div className={`${styles.userLimit} ${isMenuOpen ? styles.open : ''}`}>
                {loading ? <UserInfoLoader /> : <>
                    <div className={styles.limitUsed}>
                        Использовано компаний <span>{usedByCompanies}</span>
                    </div>
                    <div className={styles.limitAll}>
                        Лимит по компаниям <span>{limitOnCompanies}</span>
                    </div>
                </>}
            </div>
            <div className={styles.userData}>
                <div className={styles.userDataWrapper}>
                    <div className={styles.userName}>{'Алексей А.'} </div>
                    <button className={styles.logout} onClick={handlelogout}>Выйти</button>
                </div>
                <img width={32} height={32} src={avatar} alt="avatar" className={styles.userImg} />
            </div>
        </div>
    )
}

export default UserWindow