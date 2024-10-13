import React, { useEffect, useState } from 'react'
import styles from './searchForm.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getHistograms } from '../../store/slices/histogramsSlice'
import toast from 'react-hot-toast'

const TONALITY = [
  { id: 'any', name: 'любая' },
  { id: 'negative', name: 'негативная' },
  { id: 'positive', name: 'позитивная' }

]

const SearchForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [inn, setInn] = useState('')
  const [tonalityParams, setTonalityParams] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [limit, setLimit] = useState(0)
  const [maxFullnes, setMaxFullnes] = useState(false)
  const [inBusinessNews, setInBusinessNews] = useState(false)
  const [onlyMainRole, setOnlyMainRole] = useState(false)
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false)
  const [excludeTechNews, setExludeTechNews] = useState(false)
  const [excludeAnnouncements, setExсludeAnnouncements] = useState(false)
  const [excludeDigests, setExcludeDigests] = useState(false)
  function validateInn(inn) {
    const regex = /^\d{10}$/;
    return regex.test(inn);
  }
  const validateFields = () => {
    const newErrors = {}
    const today = new Date().toISOString().split('T')[0]
    const todayDate = new Date(today)

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    // if (!inn || inn.length !== 10) {
    //   newErrors.inn = 'ИНН компании должен состоять из 10 цифр'
    // }
    if (!inn || !validateInn(inn)) {
      newErrors.inn = 'ИНН компании должен состоять из 10 цифр';
    }
    if (!startDate) {
      newErrors.startDate = 'Дата начала обязательна'
    } else if (startDateObj > todayDate) {
      newErrors.startDate = 'Дата начала не может быть в будущем'
      toast.error('Дата начала не может быть в будущем')

    }
    if (!endDate) {
      newErrors.endDate = 'Дата окончания обязательна'
    } else if (endDateObj > todayDate) {
      newErrors.endDate = 'Дата окончания не может быть в будущем'
      toast.error('Дата окончания не может быть в будущем')

    }
    if (startDateObj && endDateObj && startDateObj > endDateObj) {
      newErrors.endDate = 'Дата начала не может быть позже даты окончания'
      toast.error('Дата начала не может быть позже даты окончания')
    }
    if (!limit || limit < 1 || limit > 1000) {
      newErrors.limit = 'Количество документов должно быть от 1 до 1000'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  };



  useEffect(() => {
    const isValid = validateFields()
    setIsFormValid(isValid)
  }, [inn, startDate, endDate, limit])

  const handleSearch = () => {
    const params = {
      inn,
      tonalityParams,
      startDate,
      endDate,
      limit,
      maxFullnes,
      inBusinessNews,
      onlyMainRole,
      onlyWithRiskFactors,
      excludeTechNews,
      excludeAnnouncements,
      excludeDigests
    }

    try {
      dispatch(getHistograms(params)).unwrap()
      navigate('/output')
    } catch (e) {
      toast.error('Произошла ошибка во время запроса')
    }

  }
  return (
    <div className={styles.search}>
      <div className={styles.searchItems}>
        <div className={styles.searchItem}>
          <label className={styles.searchLabel}>
            <span>
              ИНН компании
              <span
                className={errors.inn ? styles.footnoteInvalid : styles.footnoreValid} >
              </span>
            </span>
            <input
              className={errors.inn ? styles.inputInvalid : ''}
              type="text"
              placeholder="10 цифр"
              maxLength={10}
              pattern="\d{10}"
              inputMode="numeric"
              onChange={(e) => setInn(e.target.value)}
            />
          </label>
          <label className={styles.searchLabel}>
            <span>Тональность</span>
            <select
              value={tonalityParams}
              onChange={(e) => setTonalityParams(e.target.value)} >
              {TONALITY.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.searchLabel}>
            <span>Количество документов в выдаче
              <span
                className={errors.limit ? styles.footnoteInvalid : styles.footnoreValid} >
              </span></span>
            <input
              className={errors.limit ? styles.inputInvalid : ''}
              type="number"
              inputMode="numeric"
              pattern="\d{1000}"
              maxLength={1000}
              placeholder='От 1 до 1000'
              onChange={(e) => setLimit(e.target.value)}
            />
          </label>
          <label className={styles.searchLabel}>
            <span>Диапазон поиска
              <span
                className={(errors.startDate || errors.endDate) ? styles.footnoteInvalid : styles.footnoreValid} >
              </span>
            </span>
            <div className={styles.inputWrapper}>
              <input
                className={errors.startDate ? styles.inputInvalid : ''}
                type="date"
                placeholder='Дата начала'
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className={errors.endDate ? styles.inputInvalid : ''}
                type="date"
                placeholder='Дата конца'
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox1'
                className={styles.checkbox}
                checked={maxFullnes}
                onChange={() => setMaxFullnes(!maxFullnes)}
              />
              <label htmlFor="checkbox1" className={styles.checkboxLabel}>Признак максимальной полноты</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox2'
                className={styles.checkbox}
                checked={inBusinessNews}
                onChange={() => setInBusinessNews(!inBusinessNews)}
              />
              <label htmlFor="checkbox2" className={styles.checkboxLabel}>Упоминания в бизнес-контексте</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox3'
                className={styles.checkbox}
                checked={onlyMainRole}
                onChange={() => setOnlyMainRole(!onlyMainRole)}
              />
              <label htmlFor="checkbox3" className={styles.checkboxLabel}>Главная роль в публикации</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox4'
                className={styles.checkbox}
                checked={onlyWithRiskFactors}
                onChange={() => setOnlyWithRiskFactors(!onlyWithRiskFactors)}
              />
              <label htmlFor="checkbox4" className={styles.checkboxLabel}>Публикации только с риск-факторами</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox5'
                className={styles.checkbox}
                checked={excludeTechNews}
                onChange={() => setExludeTechNews(!excludeTechNews)}
              />
              <label htmlFor="checkbox5" className={styles.checkboxLabel}>Включать технические новости рынков</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox6'
                className={styles.checkbox}
                checked={excludeAnnouncements}
                onChange={() => setExсludeAnnouncements(!excludeAnnouncements)}
              />
              <label htmlFor="checkbox6" className={styles.checkboxLabel}>Включать анонсы и календари</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkbox7'
                className={styles.checkbox}
                checked={excludeDigests}
                onChange={() => setExcludeDigests(!excludeDigests)}
              />
              <label htmlFor="checkbox7" className={styles.checkboxLabel}>Включать сводки новостей</label>
            </div>
          </div>
          {/* <Link to="/output"> */}
          <button onClick={handleSearch}
            className={styles.searchBtn}
            disabled={!isFormValid}    >
            Поиск
          </button>
          {/* </Link> */}
          <span className={styles.required}>
            {isFormValid ? 'Обязательные поля заполнены ' : 'Обязательные к заполнению поля'}
            <span
              className={!isFormValid ? styles.footnoteInvalid : styles.footnoreValid} >
            </span> </span>
        </div>
      </div>

    </div>
  )
}

export default SearchForm