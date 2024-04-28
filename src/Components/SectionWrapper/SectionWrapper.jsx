import './SectionWrapper.css'

const SectionWrapper = ( props ) => {
    return (
        <>
            <div className="SectionWrapper">
                {props.children}
            </div>
        </>
    )
}

export default SectionWrapper