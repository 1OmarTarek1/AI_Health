import { TabletNav, MainNav } from '../../Components'
import './WebNav.css'
import './HomeNav.css'



const WebNav = ({ profilePictureUrl }) => {
    return (
        <>
            <MainNav profilePictureUrl={profilePictureUrl} />
            <TabletNav />
        </>
    ) 
}

export default WebNav