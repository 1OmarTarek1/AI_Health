import { CategorySec, ContactSec, HomeSec, ServicesSec } from '../../Sections'
import { PageContainer } from '../../Components'
import './Home.css'



const Home = () => {
    return (
        <>
            <div className="HomePage">
                <HomeSec />
                <PageContainer>
                    <ServicesSec />
                    <CategorySec />
                    <ContactSec />
                </PageContainer>
            </div>
        </>
    )
}

export default Home