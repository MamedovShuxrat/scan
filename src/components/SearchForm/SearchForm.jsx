import React, { useEffect, useState } from 'react'
import styles from './searchForm.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getHistograms } from '../../store/slices/histogramsSlice'
import { fetchDocumentsIDs } from '../../store/slices/documentsSlice'
import { validateInn, validateLimit } from '../utils/validateFunctions'
import toast from 'react-hot-toast'

const TONALITY = [
  { id: 'any', name: 'любая' },
  { id: 'negative', name: 'негативная' },
  { id: 'positive', name: 'позитивная' }

]

const INITIAL_FORM = {
  inn: '',
  tonalityParams: '',
  startDate: '',
  endDate: '',
  limit: '',
  maxFullnes: false,
  inBusinessNews: false,
  onlyMainRole: false,
  onlyWithRiskFactors: false,
  excludeTechNews: false,
  excludeAnnouncements: false,
  excludeDigests: false,
};

const SearchForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(INITIAL_FORM)

  const handleFormChange = (value, fieldName) => {
    setForm(oldForm => {
      return {
        ...oldForm,
        [fieldName]: value
      }
    })
  }
  const [isFormValid, setIsFormValid] = useState(false)



  const validateFields = () => {
    const newErrors = {}
    const today = new Date().toISOString().split('T')[0]
    const todayDate = new Date(today)

    const startDateObj = new Date(form.startDate)
    const endDateObj = new Date(form.endDate)


    if (!form.inn || !validateInn(form.inn)) {
      newErrors.inn = 'ИНН компании должен состоять из 10 цифр';
    }
    if (!form.startDate) {
      newErrors.startDate = 'Дата начала обязательна'
    } else if (startDateObj > todayDate) {
      newErrors.startDate = 'Дата начала не может быть в будущем'
      toast.error('Дата начала не может быть в будущем')

    }
    if (!form.endDate) {
      newErrors.endDate = 'Дата окончания обязательна'
    } else if (endDateObj > todayDate) {
      newErrors.endDate = 'Дата окончания не может быть в будущем'
      toast.error('Дата окончания не может быть в будущем')

    }
    if (startDateObj && endDateObj && startDateObj > endDateObj) {
      newErrors.endDate = 'Дата начала не может быть позже даты окончания'
      toast.error('Дата начала не может быть позже даты окончания')
    }
    if (!form.limit || !validateLimit(form.limit)) {
      newErrors.limit = 'Количество документов должно быть от 0 до 1000';
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    const isValid = validateFields()
    setIsFormValid(isValid)
  }, [form.inn, form.startDate, form.endDate, form.limit])

  const handleSearch = () => {
    localStorage.removeItem('docsData');
    localStorage.removeItem('docsIDs');
    const params = {
      inn: form.inn,
      tonalityParams: form.tonalityParams,
      startDate: form.startDate,
      endDate: form.endDate,
      limit: form.limit,
      maxFullnes: form.maxFullnes,
      inBusinessNews: form.inBusinessNews,
      onlyMainRole: form.onlyMainRole,
      onlyWithRiskFactors: form.onlyWithRiskFactors,
      excludeTechNews: form.excludeTechNews,
      excludeAnnouncements: form.excludeAnnouncements,
      excludeDigests: form.excludeDigests
    }

    try {
      dispatch(getHistograms(params)).unwrap()
      dispatch(fetchDocumentsIDs(params)).unwrap()
      localStorage.setItem('searchPerformed', JSON.stringify(true))
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
              onChange={(e) => handleFormChange(e.target.value, 'inn')}
            />
          </label>
          <label className={styles.searchLabel}>
            <span>Тональность</span>
            <select
              value={form.tonalityParams}
              onChange={(e) => handleFormChange(e.target.value, 'tonalityParams')} >
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
              type="text"
              placeholder="От 0 до 1000"
              value={form.limit}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleFormChange(value, 'limit');
                }
              }}
              maxLength={4}
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
                onChange={(e) => handleFormChange(e.target.value, 'startDate')}
              />
              <input
                className={errors.endDate ? styles.inputInvalid : ''}
                type="date"
                placeholder='Дата конца'
                onChange={(e) => handleFormChange(e.target.value, 'endDate')}
              />
            </div>
          </label>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxMaxFullnes'
                className={styles.checkbox}
                checked={form.maxFullnes}
                onChange={() => setForm({ ...form, maxFullnes: !form.maxFullnes })}
              />
              <label htmlFor="checkboxMaxFullnes" className={styles.checkboxLabel}>Признак максимальной полноты</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxInBusiness'
                className={styles.checkbox}
                checked={form.inBusinessNews}
                onChange={() => setForm({ ...form, inBusinessNews: !form.inBusinessNews })}
              />
              <label htmlFor="checkboxInBusiness" className={styles.checkboxLabel}>Упоминания в бизнес-контексте</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxOnlyMainRole'
                className={styles.checkbox}
                checked={form.onlyMainRole}
                onChange={() => setForm({ ...form, onlyMainRole: !form.onlyMainRole })}
              />
              <label htmlFor="checkboxOnlyMainRole" className={styles.checkboxLabel}>Главная роль в публикации</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxOnlyWithRisks'
                className={styles.checkbox}
                checked={form.onlyWithRiskFactors}
                onChange={() => setForm({ ...form, onlyWithRiskFactors: !form.onlyWithRiskFactors })}
              />
              <label htmlFor="checkboxOnlyWithRisks" className={styles.checkboxLabel}>Публикации только с риск-факторами</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxExcludeTech'
                className={styles.checkbox}
                checked={form.excludeTechNews}
                onChange={() => setForm({ ...form, excludeTechNews: !form.excludeTechNews })}
              />
              <label htmlFor="checkboxExcludeTech" className={styles.checkboxLabel}>Включать технические новости рынков</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxExludeAnnouncements'
                className={styles.checkbox}
                checked={form.excludeAnnouncements}
                onChange={() => setForm({ ...form, excludeAnnouncements: !form.excludeAnnouncements })}
              />
              <label htmlFor="checkboxExludeAnnouncements" className={styles.checkboxLabel}>Включать анонсы и календари</label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id='checkboxExcludeDigests'
                className={styles.checkbox}
                checked={form.excludeDigests}
                onChange={() => setForm({ ...form, excludeDigests: !form.excludeDigests })}
              />
              <label htmlFor="checkboxExcludeDigests" className={styles.checkboxLabel}>Включать сводки новостей</label>
            </div>
          </div>
          <button onClick={handleSearch}
            className={styles.searchBtn}
            disabled={!isFormValid}    >
            Поиск
          </button>
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