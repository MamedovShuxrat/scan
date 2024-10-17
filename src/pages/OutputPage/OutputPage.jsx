import React, { useEffect, useState } from 'react'
import styles from './outputpage.module.scss'
import outputImg from '../../assets/images/output-bg.png'
import leftBtn from '../../assets/icons/common/left.svg'
import rightBtn from '../../assets/icons/common/right.svg'
import { useDispatch, useSelector } from 'react-redux'
import useResize from '../../components/utils/useResize'
import docsImg from '../../assets/images/docs-img-1.png'
import docsImg1 from '../../assets/images/docs-img-2.png'
import ThreeDots from '../../components/utils/ThreeDotsLoader'


const OutputPage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.histograms.status)
  const histogramsData = useSelector((state) => state.histograms.data)
  const [totalDocuments, setTotalDocumenst] = useState(null)
  const [transformedData, setTransformedData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = useResize(9)
  const transformData = (data) => {
    const totalDocuments = data?.data?.find(item => item.histogramType === 'totalDocuments')?.data || []
    const riskFactors = data?.data?.find(item => item.histogramType === 'riskFactors')?.data || []

    return totalDocuments.map((item, index) => ({
      period: new Date(item.date).toLocaleDateString(),
      total: item.value,
      risks: riskFactors[index]?.value || 0
    }))
  }

  useEffect(() => {
    if (!histogramsData || histogramsData.length === 0) {
      const savedData = localStorage.getItem('histogramsData');

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const transformed = transformData(parsedData);
        setTransformedData(transformed);
        const totalDocumentsCount = parsedData?.data?.find(item => item.histogramType === 'totalDocuments')?.data.length || 0;
        setTotalDocumenst(totalDocumentsCount);
      }
    } else {
      const transformed = transformData(histogramsData);
      setTransformedData(transformed);

      const totalDocumentsCount = histogramsData?.data?.find(item => item.histogramType === 'totalDocuments')?.data.length || 0;
      setTotalDocumenst(totalDocumentsCount);
    }
  }, [histogramsData]);


  const renderData = () => {
    const start = currentIndex * itemsPerPage
    const end = start + itemsPerPage
    const paginatedData = transformedData.slice(start, end)
    return paginatedData.map((item, index) => (
      <div key={index} className={styles.resultItem}>
        <span>{item.period}</span>
        <span>{item.total}</span>
        <span>{item.risks}</span>
      </div>
    ))
  }
  const handleNext = () => {
    if ((currentIndex + 1) * itemsPerPage < transformedData.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
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
              <p className={styles.mainDesc}>Найдено {totalDocuments} вариантов</p>
            </div>
            <div className={styles.outputResultWrapper}>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={styles.resultLeft}>
                <img src={leftBtn} alt="left arrow" />
              </button>
              <div className={styles.resultWrapper}>
                <div className={styles.resultTitleWrapper}>
                  <span>Период</span>
                  <span>Всего</span>
                  <span>Риски</span>
                </div>
                <div className={styles.resultList}>
                  {status === 'loading' ? (
                    <div style={{ margin: '0 auto' }}><ThreeDots /></div>
                  ) : (
                    renderData()
                  )}
                </div>
              </div>
              <button onClick={handleNext}
                disabled={(currentIndex + 1) * itemsPerPage >= transformedData.length}
                className={styles.resultRight}>
                <img src={rightBtn} alt="right arrow" />
              </button>
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