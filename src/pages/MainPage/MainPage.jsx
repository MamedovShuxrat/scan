import React from 'react'
import ServiceBlock from '../../components/ServiceBlock/ServiceBlock'
import WhyUsBlock from '../../components/WhyUsBlock/WhyUsBlock'
import ImageBlock from '../../components/ImageBlock/ImageBlock'

const MainPage = () => {
    return (
        <main>
            <div className="container">
                <ServiceBlock />
                <WhyUsBlock />
                <ImageBlock />
            </div>
        </main>
    )
}

export default MainPage