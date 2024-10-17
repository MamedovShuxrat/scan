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
import { fetchDocumentsDetails } from '../../store/slices/documentsSlice'


const OutputPage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.histograms.status)
  const docsIDs = useSelector((state) => state.documents.ids)
  const histogramsData = useSelector((state) => state.histograms.data)

  const [visibleDocs, setVisibleDocs] = useState([])
  const [docsData, setDocsData] = useState([])

  const [totalDocuments, setTotalDocumenst] = useState(null)
  const [transformedData, setTransformedData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = useResize(9)


  useEffect(() => {
    console.log(docsData, 'docsData');
  }, [docsData])


  useEffect(() => {
    const fetchInitialDocs = async () => {
      if (docsIDs.length > 0) {
        const initialDocs = docsIDs.slice(0, 10);
        setVisibleDocs(initialDocs);
        try {
          const response = await dispatch(fetchDocumentsDetails({ documentIds: initialDocs }));
          const responseData = response.payload;
          console.log(responseData, 'responseData');

          if (Array.isArray(responseData)) {
            const newDocs = responseData.map(item => item.ok);
            setDocsData(newDocs);
            console.log(docsData, 'use');

          } else {
            console.error('Response is not an array:', responseData);
          }
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      }
    };

    fetchInitialDocs();
  }, [dispatch, docsIDs]);


  const handleShowMore = async () => {
    if (visibleDocs.length >= docsIDs.length) return;

    const nextDocs = docsIDs.slice(visibleDocs.length, visibleDocs.length + 10);
    setVisibleDocs(prev => [...prev, ...nextDocs]);

    try {
      const response = await dispatch(fetchDocumentsDetails({ documentIds: nextDocs }));
      const responseData = response.payload;
      if (Array.isArray(responseData)) {
        const newDocs = responseData.map(item => item.ok);
        docsData(prev => [...prev, ...newDocs]);
      } else {
        console.error('Response is not an array:', responseData);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
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
              <h2 className={styles.outputTitle}>
                {transformedData ? "Результаты успешно загружены!" : "Ищем. Скоро будут результаты"}</h2>
              <h6 className={styles.subtitle}>
                {transformedData ? "Мы нашли информацию, соответствующую вашему запросу. Пожалуйста, просмотрите результаты ниже" : "Поиск может занять некоторое время, просим сохранять терпение"}
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
            <button onClick={handleShowMore} className={styles.docsBtnMore}>Показать больше</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default OutputPage


[
  {
    "ok": {
      "schemaVersion": "1.2",
      "id": "1:wqvQvdCjRyrQk8K3ItCSXNGL0IMe0ZjRk9GV0IVG0K8ZVx3Qr0E+QWXQlNCxcnVmd+KAnsKpYtCKYVvQiwDQldC/W8Km0KbRkQjQhB7CplEgQmjigKA5V0Eh4oCaVdCK0YM=",
      "version": 1,
      "issueDate": "2024-10-11T23:24:44+03:00",
      "url": "https://kaliningrad.bezformata.com/listnews/kaliningradskoy-oblastnoy-filarmonii/137622536/",
      "source": {
        "id": 15127,
        "groupId": 8388786,
        "name": "БезФормата. Калининград (kaliningrad.bezformata.com)",
        "categoryId": 26,
        "levelId": 2,
        "distributionMethodId": 1
      },
      "dedupClusterId": "38128B98",
      "plotClusterId": "MjQxMDExXzY3ODFjMWQyLWVjYjItNGY4Ni1hYTVmLWVhY2JiNzQ4YTJlZA==",
      "title": {
        "text": "Мировые шедевры в этих жанрах прозвучали на гала-концерте, посвященном 65-летнему юбилею Калининградской областной филармонии",
        "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence><entity type=\"theme\" local-id=\"15\">Мировые шедевры в этих жанрах прозвучали на гала-концерте, посвященном 65-летнему юбилею <entity type=\"company\" local-id=\"5\">Калининградской областной филармонии</entity>\r\n&lt;data&gt;\r\n&lt;body&gt;&lt;div itemprop=\"articleBody\"&gt;\r\n\t                              &lt;index&gt;\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t&lt;div&gt;\r\n\t\t\t\t\t\t\t\t&lt;div id=\"containerId345972\"&gt;&lt;/div&gt;\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t&lt;/div&gt;&lt;p&gt; </entity></sentence></scandoc>"
      },
      "content": {
        "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence>\"Опера. </sentence><sentence>Оперетта. </sentence><sentence>Мюзикл\". </sentence><sentence><entity type=\"theme\" local-id=\"16\">Мировые шедевры в этих жанрах прозвучали на гала-концерте, посвященном 65-летнему юбилею <entity type=\"company\" local-id=\"5\">Калининградской областной филармонии</entity>. </entity></sentence><sentence><speech author-local-id=\"5\">Вместе с именитыми гостями из <entity type=\"location\" local-id=\"22\">Москвы</entity>: солистом оперных трупп \"Большого\" и <entity type=\"company\" local-id=\"6\">театра \"Новой оперы\" </entity><entity type=\"person\" local-id=\"2\">Валерием Макаровым </entity>и вокалисткой <entity type=\"location\" local-id=\"22\">Московского </entity>академического музыкального <entity type=\"company\" local-id=\"10\">театра имени Станиславского и Немировича-Данченко </entity><entity type=\"person\" local-id=\"3\">Жаргал Цырендагбаевой </entity></speech>– выступили концертный духовой оркестр и солисты <entity type=\"company\" local-id=\"5\">филармонии</entity>. </sentence><sentence>Музыканты исполнили произведения Чайковского, Римского-Корсакова, Пуччини, Кальмана и многих других композиторов. </sentence><sentence>Этот вечер стал кульминацией серии юбилейных концертов, которая завершится 12 октября. &lt;/p&gt; &lt;p&gt; &lt;strong&gt; </sentence><sentence><entity type=\"person\" local-id=\"1\">ВИКТОР БОБКОВ</entity>, ДИРЕКТОР <entity type=\"company\" local-id=\"7\">КАЛИНИНГРАДСКОЙ ОБЛАСТНОЙ ФИЛАРМОНИИ ИМЕНИ Е.Ф. СВЕТЛАНОВА</entity>: &lt;/strong&gt; &lt;/p&gt; &lt;p&gt; &lt;em&gt; </sentence><sentence><speech author-local-id=\"1\"><speech author-local-id=\"7\">– Репертуар был подобран таким образом, чтобы показать как раз насколько мы владеем различными временными направлениями. </speech><sentence>Это и барочная музыка, это музыка и романтическая, это музыка и современная, это авангард.</sentence></speech> </sentence><sentence>То есть все то, что подвластно нашим замечательным, выдающимся музыкантам. &lt;/em&gt; \r\n\t\t\t\t\t\t\t\t\t\t&lt;/p&gt;&lt;div id=\"videoadv\"&gt;\r\n\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t\t&lt;/div&gt;\r\n\r\n                        &lt;div&gt;\r\n&lt;div id=\"adfox_169469407653772735\"&gt;&lt;/div&gt;\r\n\r\n\r\n&lt;/div&gt;&lt;p&gt; &lt;p&gt;</sentence><sentence>А яркой точкой в череде праздничных выступлений музыкантов станет симфонический вечер \"Музыкальная сборная России\". </sentence><sentence><entity type=\"person\" local-id=\"4\">Мелодии Моцарта</entity>, Штрауса, Грендаля и Борна исполнят артисты оркестра филармонии и солисты Санкт-Петербургского Дома музыки. &lt;/p&gt; &lt;p&gt;</sentence><sentence><entity type=\"theme\" local-id=\"18\">Перед концертом все желающие смогут также посетить выставку, посвященную истории становления <entity type=\"company\" local-id=\"7\">филармонии </entity>и увидеть красочные костюмы артистов, в которых они выходили на эту сцену в разные годы. </entity></sentence><sentence><entity type=\"theme\" local-id=\"17\">Экспозиция открылась в малом зале, который тоже впервые впустил посетителей. &lt;/p&gt; &lt;p&gt;</entity></sentence><sentence><entity type=\"theme\" local-id=\"19\">В его ремонтно-восстановительных работах принимало участие <entity type=\"company\" local-id=\"8\">Министерства по культуре и туризму Калининградской области</entity>. </entity></sentence><sentence><entity type=\"theme\" local-id=\"14\">Проект реализуется в рамках XVII Конкурса социальных и культурных проектов ПАО \"Лукойл\". &lt;/p&gt; &lt;p&gt; &lt;strong&gt; </entity></sentence><sentence><entity type=\"theme\" local-id=\"20\"><entity type=\"person\" local-id=\"0\">АНДРЕЙ ЕРМАК</entity>, МИНИСТР ПО КУЛЬТУРЕ И ТУРИЗМУ <entity type=\"location\" local-id=\"23\">КАЛИНИНГРАДСКОЙ ОБЛАСТИ</entity>: &lt;/strong&gt; &lt;/p&gt; &lt;p&gt; &lt;em&gt; </entity></sentence><sentence><speech author-local-id=\"23\"><speech author-local-id=\"0\"><speech author-local-id=\"8\">– Я сегодня видел потрясающую диаграмму: чем отличается хайп, мода и тренд? </speech><sentence>Хайп понятно, быстро, в моменте, и все уходит, исчезает.</sentence></speech></speech> </sentence><sentence>Мода какая-то определенная сезонность, и потом теряет популярность, а тренд это такая восходящая, которая становится потом классикой. </sentence><sentence>Вот, собственно, то, что делает филармония, это те самые тренды, которые она задает. </sentence><sentence>Она создает сначала какое-то событие, потом его поддерживает, а потом это становится уже классикой и входит в нашу жизнь. &lt;/em&gt; &lt;/p&gt;\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t   \t\t\t\t\t\t\t\r\n           \t\t\t\t\t\t\t\r\n\t                              &lt;/index&gt;\r\n           \t\t\t\t\t\t&lt;/div&gt;&lt;/body&gt;\r\n&lt;/data&gt;\r\n\r\n</sentence></scandoc>"
      },
      "entities": {
        "companies": [
          {
            "suggestedCompanies": [],
            "tags": [],
            "isSpeechAuthor": true,
            "localId": 5,
            "name": "Калининградская областная филармония",
            "isMainRole": true
          },
          {
            "suggestedCompanies": [],
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 6,
            "name": "театр Новой оперы",
            "entityId": 9073204,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [
              {
                "sparkId": 35916,
                "inn": "3907009554",
                "ogrn": "1023901648165",
                "searchPrecision": "maxPrecision"
              }
            ],
            "resolveInfo": {
              "resolveApproaches": [
                "sparkPersons"
              ]
            },
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": true,
            "localId": 7,
            "name": "КАЛИНИНГРАДСКАЯ ОБЛАСТНАЯ ФИЛАРМОНИЯ ИМЕНИ Е.Ф. СВЕТЛАНОВА",
            "entityId": 244038673,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [
              {
                "sparkId": 7889665,
                "inn": "3906285632",
                "ogrn": "1133926000889",
                "searchPrecision": "maxPrecision"
              }
            ],
            "resolveInfo": {
              "resolveApproaches": [
                "activeVerified"
              ]
            },
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": true,
            "localId": 8,
            "name": "Министерство по культуре и туризму Калининградской области",
            "entityId": 89805606,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [
              {
                "sparkId": 211,
                "inn": "7708004767",
                "ogrn": "1027700035769",
                "searchPrecision": "maxPrecision"
              }
            ],
            "resolveInfo": {
              "resolveApproaches": [
                "activeVerified"
              ]
            },
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 9,
            "name": "ПАО ЛУКОЙЛ",
            "entityId": 579065,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [
              {
                "sparkId": 1156019,
                "inn": "7710081367",
                "ogrn": "1027700066580",
                "searchPrecision": "maxPrecision"
              }
            ],
            "resolveInfo": {
              "resolveApproaches": [
                "activeVerified"
              ]
            },
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 10,
            "name": "Театр Станиславского и Немировича-Данченко",
            "entityId": 126051384,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [],
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 11,
            "name": "Министерство по культуре и туризму Калининградской области",
            "entityId": 89805606,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [],
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 12,
            "name": "ПАО ЛУКОЙЛ",
            "entityId": 579065,
            "isMainRole": false
          },
          {
            "suggestedCompanies": [],
            "tags": [
              "inBusinessNews"
            ],
            "isSpeechAuthor": false,
            "localId": 13,
            "name": "Театр Станиславского и Немировича-Данченко",
            "entityId": 126051384,
            "isMainRole": false
          }
        ],
        "people": [
          {
            "rotatedName": "ЕРМАК АНДРЕЙ",
            "tags": [
              "probablyNotIndividualEntrepreneur",
              "inBusinessNews"
            ],
            "isSpeechAuthor": true,
            "localId": 0,
            "name": "АНДРЕЙ ЕРМАК",
            "entityId": 63406268,
            "isMainRole": false
          },
          {
            "rotatedName": "БОБКОВ ВИКТОР",
            "tags": [
              "probablyNotIndividualEntrepreneur",
              "inBusinessNews"
            ],
            "isSpeechAuthor": true,
            "localId": 1,
            "name": "ВИКТОР БОБКОВ",
            "entityId": 86658483,
            "isMainRole": false
          },
          {
            "rotatedName": "Макаров Валерий",
            "tags": [],
            "isSpeechAuthor": false,
            "localId": 2,
            "name": "Валерий Макаров",
            "isMainRole": false
          },
          {
            "rotatedName": "Цырендагбаевой Жаргал",
            "tags": [],
            "isSpeechAuthor": false,
            "localId": 3,
            "name": "Жаргал Цырендагбаевой",
            "isMainRole": false
          },
          {
            "rotatedName": "Моцарт Мелодия",
            "tags": [],
            "isSpeechAuthor": false,
            "localId": 4,
            "name": "Мелодия Моцарт",
            "isMainRole": false
          }
        ],
        "themes": [
          {
            "localId": 14,
            "name": "Проекты",
            "entityId": 14217078,
            "tonality": "neutral"
          },
          {
            "localId": 15,
            "name": "Искусство и культура",
            "entityId": 8543360,
            "tonality": "positive"
          },
          {
            "localId": 16,
            "name": "Искусство и культура",
            "entityId": 8543360,
            "tonality": "positive"
          },
          {
            "localId": 17,
            "name": "Искусство и культура",
            "entityId": 8543360,
            "tonality": "positive"
          },
          {
            "localId": 18,
            "name": "Выставка",
            "entityId": 14215405,
            "tonality": "positive",
            "participant": {
              "localId": 7,
              "type": "company"
            }
          },
          {
            "localId": 19,
            "name": "Туризм",
            "entityId": 94378998,
            "tonality": "neutral"
          },
          {
            "localId": 20,
            "name": "Туризм",
            "entityId": 94378998,
            "tonality": "neutral"
          }
        ],
        "locations": [
          {
            "code": {
              "countryCode": "RUS",
              "regionCode": "27"
            },
            "localId": 21,
            "name": "калининград",
            "isMainRole": false
          },
          {
            "code": {
              "countryCode": "RUS",
              "regionCode": "45"
            },
            "localId": 22,
            "name": "Москва",
            "isMainRole": false
          },
          {
            "code": {
              "countryCode": "RUS",
              "regionCode": "27"
            },
            "localId": 23,
            "name": "Калининградская Область",
            "isMainRole": false
          }
        ]
      },
      "attributes": {
        "isTechNews": false,
        "isAnnouncement": false,
        "isDigest": false,
        "isSpeechRecognition": false,
        "influence": 33.0,
        "wordCount": 316,
        "coverage": {
          "value": 2333.0,
          "state": "hasData"
        }
      },
      "language": "russian"
    }
  }
]