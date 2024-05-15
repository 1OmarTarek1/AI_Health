import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ServicesPage, Category, Contact, Profile } from './Pages';
import { Footer, WebNav } from './Sections';
import './App.css';
import { ReloadEffect, ToTopReload, ToTopBtn } from './Components';



const App = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState(() => {
        // Retrieve profile picture URL from local storage on component mount
        return localStorage.getItem('profilePictureUrl') || '';
    });
    return (
        <>
        <Router basename='/testAI'> 
            <div className="mainContainer">
                <ReloadEffect />
                <WebNav profilePictureUrl={profilePictureUrl} />
                    <Routes>
                        <Route path = '/'               element = { < Home          /> } />
                        <Route path = '/ServicesPage'   element = { < ServicesPage  /> } />
                        <Route path = '/Category'       element = { < Category      /> } />
                        <Route path = '/Contact'        element = { < Contact       /> } />
                        <Route 
                        path = '/Profile'        
                        element = {< Profile 
                                profilePictureUrl={profilePictureUrl} 
                                setProfilePictureUrl={setProfilePictureUrl}
                            />} 
                        />
                    </Routes>
                    <Footer />
            </div>
            <ToTopBtn />
            <ToTopReload />
        </Router>
        </>
    )
}

export default App