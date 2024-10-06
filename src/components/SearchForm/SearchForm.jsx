import React from 'react'
import styles from './searchForm.module.scss'
import { Link } from 'react-router-dom'

const TONALITY = [
  {
    id: 1,
    name: 'любая'
  }, ,
  {
    id: 2,
    name: 'негативная'
  },
  {
    id: 3,
    name: 'позитивная'
  }

]

const SearchForm = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchItems}>
        <div className={styles.searchItem}>
          <label className={styles.searchLabel}>
            <span>ИНН компании *</span>
            <input
              type="number"
              placeholder="10 цифр"
              min="0"
              max="9999999999"
              pattern="\d{10}"
              inputMode="numeric"
            />
          </label>
          <label className={styles.searchLabel}>
            <span>Тональность</span>
            <select >
              {TONALITY.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.searchLabel}>
            <span>Количество документов в выдаче *</span>
            <input
              type="number"
              placeholder='От 1 до 1000'
            />
          </label>
          <label className={styles.searchLabel}>
            <span>Диапазон поиска *</span>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                placeholder='Дата начала'
              />
              <input
                type="date"
                placeholder='Дата конца'
              />
            </div>
          </label>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox1' className={styles.checkbox} />
              <label htmlFor="checkbox1" className={styles.checkboxLabel}>Признак максимальной полноты</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox2' className={styles.checkbox} />
              <label htmlFor="checkbox2" className={styles.checkboxLabel}>Упоминания в бизнес-контексте</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox3' className={styles.checkbox} />
              <label htmlFor="checkbox3" className={styles.checkboxLabel}>Главная роль в публикации</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox4' className={styles.checkbox} />
              <label htmlFor="checkbox4" className={styles.checkboxLabel}>Публикации только с риск-факторами</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox5' className={styles.checkbox} />
              <label htmlFor="checkbox5" className={styles.checkboxLabel}>Включать технические новости рынков</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox6' className={styles.checkbox} />
              <label htmlFor="checkbox6" className={styles.checkboxLabel}>Включать анонсы и календари</label>
            </div>
            <div className={styles.checkboxItem}>
              <input type="checkbox" id='checkbox7' className={styles.checkbox} />
              <label htmlFor="checkbox7" className={styles.checkboxLabel}>Включать сводки новостей</label>
            </div>
          </div>
          <button className={styles.searchBtn} disabled>
            Поиск <Link to=''></Link>
          </button>
          <span className={styles.required}>* Обязательные к заполнению поля</span>
        </div>
      </div>

    </div>
  )
}

export default SearchForm