import { HomeSec } from '../../Sections'
// import { ContactSec, HomeSec, ServicesSec } from '../../Sections'
// import { PageContainer } from '../../Components'
import './Home.css'



const Home = () => {
    return (
        <>
            <div className="HomePage">
                <HomeSec />
                {/* <PageContainer>
                    <ServicesSec />
                    <ContactSec />
                </PageContainer> */}
            </div>
        </>
    )
}

export default Home