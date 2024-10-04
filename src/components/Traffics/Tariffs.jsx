import React from 'react'

import checked from '../../assets/icons/common/checked.svg'
import beginnerImg from '../../assets/icons/tariffs/beginner.svg'
import proImg from '../../assets/icons/tariffs/pro.svg'
import businessImg from '../../assets/icons/tariffs/business.svg'


import styles from './tariffs.module.scss'
const CARDSDATA = [
  {
    id: 1,
    title: "Beginner",
    description: "Для небольшого исследования",
    imgSrc: beginnerImg,
    newPrice: "799 ₽",
    oldPrice: "1 200 ₽",
    priceDesc: "или 150 ₽/мес. при рассрочке на 24 мес.",
    contentTitle: "В тариф входит:",
    contentItems: [
      {
        id: 1,
        imgSrc: checked,
        text: "Безлимитная история запросов"
      },
      {
        id: 2,
        imgSrc: checked,
        text: "Безопасная сделка"
      },
      {
        id: 3,
        imgSrc: checked,
        text: "Поддержка 24/7"
      },

    ],
    link: "Перейти в личный кабинет"
  },
  {
    id: 2,
    title: "Pro",
    description: "Для HR и фрилансеров",
    imgSrc: proImg,
    newPrice: "1 299 ₽",
    oldPrice: "2 600 ₽",
    priceDesc: "или 279 ₽/мес. при рассрочке на 24 мес.",
    contentTitle: "В тариф входит:",
    contentItems: [
      {
        id: 1,
        imgSrc: checked,
        text: "Все пункты тарифа Beginner"
      },
      {
        id: 2,
        imgSrc: checked,
        text: "Экспорт истории"
      },
      {
        id: 3,
        imgSrc: checked,
        text: "Рекомендации по приоритетам"
      },

    ],
    link: "Подробнее"
  },
  {
    id: 3,
    title: "Business",
    description: "Для корпоративных клиентов",
    imgSrc: businessImg,
    newPrice: "2 379 ₽",
    oldPrice: "3 700 ₽",
    contentTitle: "В тариф входит:",
    contentItems: [
      {
        id: 1,
        imgSrc: checked,
        text: "Все пункты тарифа Pro"
      },
      {
        id: 2,
        imgSrc: checked,
        text: "Безлимитное количество запросов"
      },
      {
        id: 3,
        imgSrc: checked,
        text: "Приоритетная поддержка"
      },

    ],
    link: "Подробнее"
  }
]

const Tariffs = () => {
  const isAuth = true

  return (
    <section className={styles.traffics} >
      <h2 className={styles.trafficsTitle}>наши тарифы</h2>
      <div className={styles.cards}>
        {CARDSDATA.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={`${styles.cardTop} ${styles[card.title.toLocaleLowerCase()]}`}>
              <div className={styles.cardText}>
                <h6 className={styles.cardtitle}>{card.title}</h6>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
              <img src={card.imgSrc} alt={card.title} className={styles.cardTopImg} />
            </div>
            <div className={styles.cardWrapper}>
              <div className={styles.cardPriceWrapper}>
                <div className={styles.priceWrap}>
                  <span className={styles.newPrice}>{card.newPrice}</span>
                  <span className={styles.oldPrice}>{card.oldPrice}</span>
                </div>
                {card.priceDesc && <p className={styles.priceDesc}>{card.priceDesc}</p>}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardContentTitle}>{card.contentTitle}</div>
                {card.contentItems.map((item) => (
                  <div key={item.id} className={styles.cardContentItem}>
                    <img src={item.imgSrc} alt="checked" className={styles.cardItemImg} />
                    <span className={styles.cardItemText}>{item.text}</span>
                  </div>
                ))}
                <a href={isAuth ? "#" : "#"}
                  className={`${styles.cardBtn} ${styles[card.title.toLocaleLowerCase()]}`}>
                  {card.title === "Beginner" ? "Перейти в личный кабинет" : "Подробнее"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tariffs