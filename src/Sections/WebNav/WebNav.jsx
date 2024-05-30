import { TabletNav, MainNav } from '../../Components'
import './WebNav.css'
import './HomeNav.css'



const WebNav = ({ profilePictureUrl, setAuthenticated, authenticated, setUsername }) => {
    return (
        <>
            <MainNav
            profilePictureUrl={profilePictureUrl} 
            setAuthenticated={setAuthenticated} 
            authenticated={authenticated} 
            setUsername={setUsername}
            />
            <TabletNav />
        </>
    ) 
}

export default WebNav