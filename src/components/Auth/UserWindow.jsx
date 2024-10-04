import React from 'react'
import styles from './loginWindow.module.scss'

import avatar from '../../assets/images/avatar.jpg'
const UserWindow = ({ isMenuOpen }) => {
    const UsedByCompanies = 34
    const LimitOnCompanies = 100
    const isLoading = true
    return (
        <div className={styles.userWindow}>
            <div className={`${styles.userLimit} ${isMenuOpen ? styles.open : ''}`}>
                {isLoading && <>
                    <div className={styles.limitUsed}>
                        Использовано компаний <span>{UsedByCompanies}</span>
                    </div>
                    <div className={styles.limitAll}>
                        Лимит по компаниям <span>{LimitOnCompanies}</span>
                    </div>
                </>}
            </div>
            <div className={styles.userData}>
                <div className={styles.userDataWrapper}>
                    <div className={styles.userName}>Алексей А. </div>
                    <button className={styles.logout}>Выйти</button>
                </div>
                <img width={32} height={32} src={avatar} alt="avatar" className={styles.userImg} />
            </div>
        </div>
    )
}

export default UserWindow