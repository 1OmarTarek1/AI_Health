import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Category } from './Pages';
import { Footer, WebNav } from './Sections';
import './App.css';
import { ToTopReload } from './Components';



const App = () => {
    return (
        <>
        <Router basename='/testAI'> 
            <div className="mainContainer">
                <WebNav />
                    <Routes>
                        <Route path = '/'          element = { < Home     /> } />
                        <Route path = '/Category'  element = { < Category /> } />
                    </Routes>
                    <Footer />
            </div>
            <ToTopReload />
        </Router>
        </>
    )
}

export default App