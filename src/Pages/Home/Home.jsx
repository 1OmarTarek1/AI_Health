import { HomeSec, ServicesSec } from '../../Sections'
import { PageContainer } from '../../Components'
import './Home.css'



const Home = () => {
    return (
        <>
            <div className="HomePage">
                <HomeSec />
                <PageContainer>
                    <ServicesSec />
                </PageContainer>
            </div>
        </>
    )
}

export default Home