import React from 'react'
import styles from './outputpage.module.scss'
import outputImg from '../../assets/images/output-bg.png'
import leftBtn from '../../assets/icons/common/left.svg'
import rightBtn from '../../assets/icons/common/right.svg'

import docsImg from '../../assets/images/docs-img-1.png'
import docsImg1 from '../../assets/images/docs-img-2.png'
const RESULTDATA = [
  {
    id: 1,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 2,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 3,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 4,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 5,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 6,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  },
  {
    id: 7,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  }
  , {
    id: 8,
    period: '10.09.2021',
    total: 5,
    risks: 0,
  }

]

const OutputPage = () => {
  return (
    <main>
      <div className="container">
        <section className={styles.output}>
          <div className={styles.outputTopWrapper}>
            <div className={styles.outputTextWrapper}>
              <h2 className={styles.outputTitle}>Ищем. Скоро будут результаты</h2>
              <h6 className={styles.subtitle}>
                Поиск может занять некоторое время, просим сохранять терпение.
              </h6>
            </div>
            <img className={styles.outputTopImg} src={outputImg} alt="bg" />
          </div>
          <div className={styles.outputMain}>
            <div className={styles.mainTextWrapper}>
              <h3 className={styles.mainTitle}>Общая сводка</h3>
              <p className={styles.mainDesc}>Найдено 4 221 вариантов</p>
            </div>
            <div className={styles.outputResultWrapper}>
              <button className={styles.resultLeft}><img src={leftBtn} alt="left arrow" /></button>
              <div className={styles.resultWrapper}>
                <div className={styles.resultTitleWrapper}>
                  <span>Период</span>
                  <span>Всего</span>
                  <span>Риски</span>
                </div>
                <div className={styles.resultList}>
                  {RESULTDATA.map((item) => (
                    <div className={styles.resultItem}>
                      <span>{item.period}</span>
                      <span>{item.total}</span>
                      <span>{item.risks}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className={styles.resultRight}><img src={rightBtn} alt="right arrow" /></button>
            </div>
          </div>

          <div className={styles.outputDocs}>
            <h4 className={styles.docsTitle}>Список документов</h4>
            <div className={styles.docsWrapper}>
              <div className={styles.docsItem}>
                <div className={styles.docsDateWrapper}>
                  <span className={styles.docsDate}>13.09.2021</span>
                  <a href='#' className={styles.docsDateLink}>Комсомольская правда KP.RU</a>
                </div>
                <h5 className={styles.docsCardTitle}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h5>
                <div className={styles.docstagWrapper}>
                  <div className={styles.docsTag}>Технические новости</div>
                </div>
                <div className={styles.docsVisual}>
                  <img src={docsImg} alt="img" className={styles.docsImg} />
                </div>
                <div className={styles.docsText}>SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.
                  <br></br>
                  Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.
                </div>
                <div className={styles.docsSourceWrapper}>
                  <a href="#" className={styles.docsSource}>Читать в источнике</a>
                  <span className={styles.docsTotalWords}>2 543 слова</span>
                </div>
              </div>
              <div className={styles.docsItem}>
                <div className={styles.docsDateWrapper}>
                  <span className={styles.docsDate}>15.10.2021</span>
                  <a href='#' className={styles.docsDateLink}>VC.RU</a>
                </div>
                <h5 className={styles.docsCardTitle}>Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций</h5>
                <div className={styles.docstagWrapper}>
                  <div className={styles.docsTag}>Технические новости</div>
                </div>
                <div className={styles.docsVisual}>
                  <img src={docsImg1} alt="img" className={styles.docsImg} />
                </div>
                <div className={styles.docsText}>Кто такой Data Scientist и чем он занимается?
                  Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.
                  <br></br>
                  В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.
                </div>
                <div className={styles.docsSourceWrapper}>
                  <a href="#" className={styles.docsSource}>Читать в источнике</a>
                  <span className={styles.docsTotalWords}>3 233 слова</span>
                </div>
              </div>
            </div>
            <button className={styles.docsBtnMore}>Показать больше</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default OutputPage