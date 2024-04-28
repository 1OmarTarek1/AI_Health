import { HomeSec, ServicesSec, WebNav } from './Sections'
import { SectionWrapper } from './Components'
import './App.css';



const App = () => {
    return (
        <>
        <div className="mainContainer">
            <WebNav />
            <HomeSec />
            <ServicesSec />
            <SectionWrapper>
                <h1>ONE</h1>
            </SectionWrapper>
            <SectionWrapper>
                <h1>ONE</h1>
            </SectionWrapper>

        </div>
        </>
    )
}

export default App