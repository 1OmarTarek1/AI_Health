import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ServicesPage, Category, Contact, Profile, Login, NotPage } from './Pages';
import { Footer, WebNav } from './Sections';
import { ReloadEffect, ToTopReload, ToTopBtn, DTitle } from './Components';
import AOS from 'aos'; // Import AOS
import defImg from './Assets/Images/no_user.png'
import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState( defImg );
    const [favorites, setFavorites] = useState([]);
    const [likedCategories, setLikedCategories] = useState({});


    useEffect(() => {
        AOS.init({
            duration: 1200, // Set animation duration
        });
    }, []);

    useEffect(() => {
        // Check local storage for authentication status and profile picture URL
        const storedAuthenticated = localStorage.getItem('authenticated') === 'true';
        const storedProfilePictureUrl = localStorage.getItem('profilePictureUrl') || '';

        // localStorage.setItem('favorites', favorites);

        setAuthenticated(storedAuthenticated);
        setProfilePictureUrl(storedProfilePictureUrl);
    }, [favorites]);


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
        <Router basename='/GET_FIT'> 
        <DTitle />
            <div className="mainContainer">
                {/* <ReloadEffect /> */}
                {authenticated ? (
                    <>
                        <WebNav 
                            profilePictureUrl={profilePictureUrl}  
                            setAuthenticated={setAuthenticated}
                            authenticated={authenticated}
                        />
                        <Routes>
                            <Route path='/Home' element={<Home />} />
                            <Route path='/ServicesPage' element={<ServicesPage />} />
                            <Route path='/Category' element={<Category 
                                favorites={favorites}
                                setFavorites={setFavorites}
                                likedCategories={likedCategories}
                                setLikedCategories={setLikedCategories}
                            />} />
                            <Route path='/Contact' element={<Contact />} />
                            <Route 
                                path='/Profile'
                                element={<Profile 
                                    profilePictureUrl={profilePictureUrl} 
                                    setProfilePictureUrl={handleProfilePictureUpdate}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    likedCategories={likedCategories}
                                    setLikedCategories={setLikedCategories}
                                />} 
                            />
                            <Route  path='*' element={<NotPage />} />
                        </Routes>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path='/' element={<Login setAuthenticated={handleLogin} 
                        setProfilePictureUrl={setProfilePictureUrl} />} />

                        <Route path='*' element={<Login 
                        setAuthenticated={handleLogin} 
                        setProfilePictureUrl={setProfilePictureUrl}/>} />
                        
                    </Routes>
                )}
            </div>
            <ToTopBtn />
            <ToTopReload />
        </Router>
    );
};

export default App;

