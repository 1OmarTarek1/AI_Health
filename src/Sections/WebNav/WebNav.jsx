import { TabletNav, MainNav } from '../../Components'
import './WebNav.css'
import './HomeNav.css'



const WebNav = ({ profilePictureUrl, setAuthenticated, authenticated }) => {
    return (
        <>
            <MainNav
            profilePictureUrl={profilePictureUrl} 
            setAuthenticated={setAuthenticated} 
            authenticated={authenticated} 
            />
            <TabletNav />
        </>
    ) 
}

export default WebNav