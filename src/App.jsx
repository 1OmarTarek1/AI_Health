import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Category } from './Pages';
import { WebNav } from './Sections';
import './App.css';



const App = () => {
    return (
        <>
        <Router> 
            <div className="mainContainer">
                <WebNav />
                    <Routes>
                        <Route path = '/'          element = { < Home     /> } />
                        <Route path = '/Category'  element = { < Category /> } />
                    </Routes>
                    <footer>CopyRight</footer>
            </div>
        </Router>
        </>
    )
}

export default App