import { HomeSec, ServicesSec, WebNav } from './Sections'
import './App.css';



const App = () => {
    return (
        <>
        <div className="mainContainer" >
            <WebNav />
            <HomeSec />
            <ServicesSec />
        </div>
        </>
    )
}

export default App