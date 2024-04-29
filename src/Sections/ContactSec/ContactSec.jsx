import { SectionWrapper } from '../../Components'
import './ContactSec.css'






const ContactSec = () => {
    return (
        <>
            <div className="ContactSec" id='Contact'>
                <SectionWrapper>
                    <form className='contactForm' action="">
                        <div className="contactTitleWrapper">
                            <span className="contactTitle">Contact Us</span>
                            <p className="contactDis">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, 
                                consequatur minus? Nulla ipsum aliquam optio in.
                                harum consequatur blanditiis :-
                            </p>
                        </div>
                        <input    className='mainInput FNameInput'   type="text"  id="F-name"   placeholder='First Name'      />
                        <input    className='mainInput LNameInput'   type="text"  id="L-name"   placeholder='Last Name'       />
                        <input    className='mainInput EmailInput'   type="email" id="Email"    placeholder='Email Address' autoComplete='true'/>
                        <input    className='mainInput NumberInput'  type="text"  id="Number"   placeholder='Phone Number'    />
                        <textarea className='mainInput MessageInput' name=""      id="Message"  placeholder='Your Message...' />
                        <div      className='SubmitBtnWrapper'>
                            <button className='SubmitBtn' type="submit">Send</button>
                        </div>
                    </form>
                </SectionWrapper>
            </div>
        </>
    )
}

export default ContactSec