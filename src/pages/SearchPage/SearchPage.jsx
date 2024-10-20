import React from 'react'
import styles from './searchPage.module.scss'

import firstBg from '../../assets/images/search-page-bg.png'
import secondBg from '../../assets/images/search-page-bg-2.png'
import SearchForm from '../../components/SearchForm/SearchForm'
const SearchPage = () => {
    return (
        <main>
            <div className="container">
                <section className={styles.searchPage}>
                    <div className={styles.searchTop}>
                        <div className={styles.searchTextWrapper}>
                            <h2 className={styles.searchTitle}>Найдите необходимые данные в пару кликов.</h2>
                            <h6 className={styles.subtitle} >
                                Задайте параметры поиска.
                                Чем больше заполните, тем точнее поиск
                            </h6>
                        </div>
                        <img className={styles.searchTopImg} src={firstBg} alt="bg" />
                    </div>
                    <div className={styles.searchMainContent}>
                        <div className={styles.searchFormWrapper}>
                            <SearchForm />
                        </div>
                        <img className={styles.searchMainImg} src={secondBg} alt="bg" />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default SearchPage