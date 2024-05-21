import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ServicesPage, Category, Contact, Profile, Login, NotPage } from './Pages';
import { Footer, WebNav } from './Sections';
import { ReloadEffect, ToTopReload, ToTopBtn } from './Components';
import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    useEffect(() => {
        // Check local storage for authentication status and profile picture URL
        const storedAuthenticated = localStorage.getItem('authenticated') === 'true';
        const storedProfilePictureUrl = localStorage.getItem('profilePictureUrl') || '';
        
        setAuthenticated(storedAuthenticated);
        setProfilePictureUrl(storedProfilePictureUrl);
    }, []);

    const handleLogin = () => {
        // Logic to handle successful login
        setAuthenticated(true);
        // Save authentication status to local storage
        localStorage.setItem('authenticated', 'true');
    };


    const handleProfilePictureUpdate = (url) => {
        // Update profile picture URL in state and local storage
        setProfilePictureUrl(url);
        localStorage.setItem('profilePictureUrl', url);
    };

    return (
        <Router basename='/testAI'> 
            <div className="mainContainer">
                <ReloadEffect />
                {authenticated ? (
                    <>
                        <WebNav 
                            profilePictureUrl={profilePictureUrl}  
                            setAuthenticated={setAuthenticated}
                            authenticated={authenticated}
                        />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/ServicesPage' element={<ServicesPage />} />
                            <Route path='/Category' element={<Category />} />
                            <Route path='/Contact' element={<Contact />} />
                            <Route 
                                path='/Profile'
                                element={<Profile 
                                    profilePictureUrl={profilePictureUrl} 
                                    setProfilePictureUrl={handleProfilePictureUpdate}
                                />} 
                            />
                            <Route  path='*' element={<NotPage />} />
                        </Routes>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path='/' element={<Login setAuthenticated={handleLogin} />} />
                        <Route path='*' element={<Login setAuthenticated={handleLogin} />} />
                    </Routes>
                )}
            </div>
            <ToTopBtn />
            <ToTopReload />
        </Router>
    );
};

export default App;
