import React from 'react';
import styles from './modalInfo.module.scss'

const ModalInfo = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Внимание!</h2>
                </div>
                <div className={styles.modalBody}>
                    <p>Функция регистрации временно недоступна.</p>
                    <p>Для входа в систему вы можете использовать следующий аккаунт:</p>
                    <p><strong>Логин:</strong> sf_student1</p>
                    <p><strong>Пароль:</strong> 4i2385j</p>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtn} onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};


export default ModalInfo;