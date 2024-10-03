import React from 'react'
import sectionBlockImg from '../../assets/images/image-block.png'
import styles from './imageBlock.module.scss'

const ImageBlock = () => {
    return (
        <section className={styles.imageWrapper}>
            <img className={styles.image} src={sectionBlockImg} alt="section image" />
        </section>
    )
}

export default ImageBlock