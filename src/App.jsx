import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ServicesPage, Category, Contact, Profile } from './Pages';
import { Footer, WebNav } from './Sections';
import './App.css';
import { ReloadEffect, ToTopReload } from './Components';



const App = () => {
    return (
        <>
        <Router basename='/testAI'> 
            <div className="mainContainer">
                <ReloadEffect />
                <WebNav />
                    <Routes>
                        <Route path = '/'               element = { < Home          /> } />
                        <Route path = '/ServicesPage'   element = { < ServicesPage  /> } />
                        <Route path = '/Category'       element = { < Category      /> } />
                        <Route path = '/Contact'        element = { < Contact       /> } />
                        <Route path = '/Profile'        element = { < Profile       /> } />
                    </Routes>
                    <Footer />
            </div>
            <ToTopReload />
        </Router>
        </>
    )
}

export default App