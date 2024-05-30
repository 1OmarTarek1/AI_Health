import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ServicesPage, Category, Contact, Profile, Login, NotPage } from './Pages';
import { Footer, WebNav } from './Sections';
import { ReloadEffect, ToTopReload, ToTopBtn, DTitle } from './Components';
import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [username, setUsername] = useState('');

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
        setUsername(username);
        // Save authentication status to local storage
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', username);
    };

    


    const handleProfilePictureUpdate = (url) => {
        // Update profile picture URL in state and local storage
        setProfilePictureUrl(url);
        localStorage.setItem('profilePictureUrl', url);
    };
    

    return (
        <Router basename='/AI_Health'> 
        <DTitle />
            <div className="mainContainer">
                <ReloadEffect />
                {authenticated ? (
                    <>
                        <WebNav 
                            profilePictureUrl={profilePictureUrl}  
                            setAuthenticated={setAuthenticated}
                            authenticated={authenticated}
                            setUsername={setUsername}
                        />
                        <Routes>
                            <Route path='/Home' element={<Home />} />
                            <Route path='/ServicesPage' element={<ServicesPage />} />
                            <Route path='/Category' element={<Category 
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />} />
                            <Route path='/Contact' element={<Contact />} />
                            <Route 
                                path='/Profile'
                                element={<Profile 
                                    profilePictureUrl={profilePictureUrl} 
                                    setProfilePictureUrl={handleProfilePictureUpdate}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    username={username}
                                />} 
                            />
                            <Route  path='*' element={<NotPage />} />
                        </Routes>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path='/' element={<Login 
                        setAuthenticated={handleLogin} 
                        username={username}
                        setUsername={setUsername}
                        />} />
                        <Route path='*' element={<Login 
                        setAuthenticated={handleLogin} 
                        username={username}
                        setUsername={setUsername}
                        />} />
                    </Routes>
                )}
            </div>
            <ToTopBtn />
            <ToTopReload />
        </Router>
    );
};

export default App;

