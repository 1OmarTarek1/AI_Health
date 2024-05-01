import './PageContainer.css'






const PageContainer = ( props ) => {
    return (
        <>
        <div className="PageContainer">
            {props.children}
        </div>
        </>
    )
}

export default PageContainer