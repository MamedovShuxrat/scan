import React, { useEffect, useState } from 'react'
import styles from './whyUsBlock.module.scss'
import leftBtn from '../../assets/icons/common/left.svg'
import rightBtn from '../../assets/icons/common/right.svg'

import time from '../../assets/icons/slider/time.svg'
import search from '../../assets/icons/slider/search.svg'
import security from '../../assets/icons/slider/security.svg'
import analytic from '../../assets/icons/slider/analytic.svg'
import support from '../../assets/icons/slider/support.svg'
import integration from '../../assets/icons/slider/integration.svg'

const SLIDESDATA = [
    {
        id: 1,
        imgSrc: time,
        title: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        id: 2,
        imgSrc: search,
        title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        id: 3,
        imgSrc: security,
        title: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
        id: 4,
        imgSrc: analytic,
        title: 'Детальный анализ и мониторинг результатов, для принятия обоснованных решений'
    },
    {
        id: 5,
        imgSrc: support,
        title: 'Круглосуточная поддержка и консультация, для максимальной эффективности'
    },
    {
        id: 6,
        imgSrc: integration,
        title: 'Совместимость с другими системами, для упрощения и ускорения бизнес-процессов'
    }

]

const WhyUsBlock = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleslides, setVisibeslides] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 575) {
                setVisibeslides(1)
            } else if (window.innerWidth <= 768) {
                setVisibeslides(2)
            } else {
                setVisibeslides(3)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const handlePrevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? SLIDESDATA.length - visibleslides : prev - 1))
    }

    const handleNextSlide = () => {
        setCurrentIndex((prev) => (prev >= SLIDESDATA.length - visibleslides ? 0 : prev + 1))
    }
    return (
        <section className={styles.whyUs}>
            <h2 className={styles.whyUsTitle}>Почему именно мы</h2>
            <div className={styles.slider}>
                <button className={styles.leftBtn} onClick={handlePrevSlide}>
                    <img width={39} height={39} src={leftBtn} alt="arrow left" />
                </button>
                <div className={styles.cardsWrapper}>
                    {SLIDESDATA
                        .slice(currentIndex, currentIndex + visibleslides)
                        .map((slide) => (
                            <div key={slide.id} className={styles.card}>
                                <img className={styles.cardIcon} src={slide.imgSrc} alt="slide icon" />
                                <p className={styles.cardTitle}>{slide.title}</p>
                            </div>
                        ))
                    }
                </div>
                <button className={styles.rightBtn} onClick={handleNextSlide}>
                    <img width={39} height={39} src={rightBtn} alt="arrow right" />
                </button>
            </div>
        </section>
    )
}

export default WhyUsBlock