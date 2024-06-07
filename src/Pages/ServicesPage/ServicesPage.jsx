import { ServicesHeader, ServicesSec } from '../../Sections'
import { PageContainer } from '../../Components'
import './ServicesPage.css'





const ServicesPage = () => {
    return (
        <>
            <PageContainer>
                <ServicesHeader />
                <ServicesSec />
            </PageContainer>
        </>
    )
}

export default ServicesPage