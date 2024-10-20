import React, { useEffect, useState } from 'react'
import styles from './outputpage.module.scss'
import outputImg from '../../assets/images/output-bg.png'
import leftBtn from '../../assets/icons/common/left.svg'
import rightBtn from '../../assets/icons/common/right.svg'
import { useDispatch, useSelector } from 'react-redux'
import useResize from '../../components/utils/useResize'
import ThreeDots from '../../components/utils/ThreeDotsLoader'
import { decodeHtml } from '../../components/utils/decodeHtml'
import { fetchDocumentsDetails } from '../../store/slices/documentsSlice'


const OutputPage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.histograms.status)
  const docsIDsFromRedax = useSelector((state) => state.documents.ids)
  const histogramsData = useSelector((state) => state.histograms.data)

  const [docsIDs, setDocsIDs] = useState([])
  const [visibleDocs, setVisibleDocs] = useState([])
  const [docsData, setDocsData] = useState([])

  const [totalDocuments, setTotalDocumenst] = useState(null)
  const [transformedData, setTransformedData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = useResize(9)


  useEffect(() => {
    const storedDocsData = localStorage.getItem('docsData');
    if (storedDocsData) {
      setDocsData(JSON.parse(storedDocsData));
    }
  }, []);

  useEffect(() => {
    if (docsData.length > 0) {
      localStorage.setItem('docsData', JSON.stringify(docsData));
    }
  }, [docsData]);

  useEffect(() => {
    if (docsIDsFromRedax && Array.isArray(docsIDsFromRedax) && docsIDsFromRedax.length > 0) {
      setDocsIDs(docsIDsFromRedax);
    } else {
      const storedDocsIDs = localStorage.getItem('docsIDs');
      if (storedDocsIDs) {
        setDocsIDs(JSON.parse(storedDocsIDs));
      } else {
        setDocsIDs([]);
      }
    }
  }, [docsIDsFromRedax]);

  useEffect(() => {
    const fetchInitialDocs = async () => {
      if (docsIDs.length > 0) {
        const initialDocs = docsIDs.slice(0, 10);
        setVisibleDocs(initialDocs);
        try {
          const response = await dispatch(fetchDocumentsDetails({ documentIds: initialDocs }));
          const responseData = response.payload;

          if (Array.isArray(responseData)) {
            const newDocs = responseData.map(item => item.ok);
            setDocsData(newDocs);

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
    const nextDocsCount = Math.min(10, docsIDs.length - visibleDocs.length);
    const nextDocs = docsIDs.slice(visibleDocs.length, visibleDocs.length + nextDocsCount);
    setVisibleDocs(prev => [...prev, ...nextDocs]);
    try {
      const response = await dispatch(fetchDocumentsDetails({ documentIds: nextDocs }));
      const responseData = response.payload;
      if (Array.isArray(responseData)) {
        const newDocs = responseData.map(item => item.ok);
        setDocsData(prev => [...prev, ...newDocs]);
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

  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    setShowLoadMore(visibleDocs.length < docsIDs.length);
  }, [visibleDocs, docsIDs]);
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
              {docsData.map((doc, index) => {
                const { content, url, title, attributes, img } = doc;
                const { isTechNews, isAnnouncement, isDigest } = attributes;
                const wordCount = attributes.wordCount;

                const tags = [];
                if (isTechNews) tags.push('Технические новости');
                if (isAnnouncement) tags.push('Анонсы и события');
                if (isDigest) tags.push('Сводки новостей');
                if (!isDigest && !isAnnouncement && !isTechNews) tags.push('Новости');

                return (
                  <div key={index} className={styles.docsItem}>
                    <div className={styles.docsDateWrapper}>
                      <span className={styles.docsDate}>{new Date(doc.issueDate).toLocaleDateString()}</span>
                      <a href={url} className={styles.docsDateLink} target="_blank" rel="noopener noreferrer">
                        {doc.source.name}
                      </a>
                    </div>
                    <h5 className={styles.docsCardTitle}>{title.text}</h5>
                    <div className={styles.docsTagWrapper}>
                      {tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className={styles.docsTag}>{tag}</div>
                      ))}
                    </div>
                    {img && <div className={styles.docsVisual}>
                      <img src={img} alt="img" className={styles.docsImg} />
                    </div>}
                    <div className={styles.docsText} dangerouslySetInnerHTML={{ __html: decodeHtml(content.markup) }} />
                    <div className={styles.docsSourceWrapper}>
                      <a href={url} className={styles.docsSource} target="_blank" rel="noopener noreferrer">
                        Читать в источнике
                      </a>
                      <span className={styles.docsTotalWords}>{wordCount} слова</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {showLoadMore && (
              <button onClick={handleShowMore} className={styles.docsBtnMore}>
                Показать больше
              </button>
            )}

          </div>
        </section>
      </div>
    </main>
  )
}

export default OutputPage
