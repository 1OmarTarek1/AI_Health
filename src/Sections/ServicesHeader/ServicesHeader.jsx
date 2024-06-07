import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import './ServicesHeader.css'
import image_1 from '../../Assets/Images/Food-1.jpg'
import image_2 from '../../Assets/Images/Food-2.jpg'
import image_3 from '../../Assets/Images/Food-4.jpg'

const ServicesHeader = () => {
  return (
    <>
        <MDBCarousel showIndicators showControls fade>
            <div className="serTitle">
                Services
            </div>
            <MDBCarouselItem itemId={1}>
                <img src={image_1} className='d-block w-100' alt='...' style={{filter:"brightness(50%) blur(3px)"}}/>
                {/* <MDBCarouselCaption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </MDBCarouselCaption> */}
            </MDBCarouselItem>

            <MDBCarouselItem itemId={2}>
                <img src={image_2} className='d-block w-100' alt='...' style={{filter:"brightness(50%) blur(3px)" }}/>
            </MDBCarouselItem>

            <MDBCarouselItem itemId={3}>
                <img src={image_3} className='d-block w-100' alt='...' style={{filter:"brightness(50%) blur(3px)"}}/>
            </MDBCarouselItem>
        </MDBCarousel>
    </>
  )
}

export default ServicesHeader