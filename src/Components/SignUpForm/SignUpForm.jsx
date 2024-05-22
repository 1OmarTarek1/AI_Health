import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaFacebookSquare, FaGoogle, FaTrashAlt } from 'react-icons/fa';
import { FaRegEnvelope, FaRegUser } from 'react-icons/fa6';
import './SignUpForm.css'



const SignUpForm = ({setAuthenticated}) => {
    const [usernameSign  , setUsernameSign  ] = useState('');
    const [emailSignValue, setEmailSignValue] = useState('');
    const [passSignValue , setPassSignValue ] = useState('');
    const [passConfValue , setPassConfValue ] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        setAuthenticated(true);
        navigate("/Profile");
    }
    return (
        <>
            <form className="mainForm signUpForm" >
                <div className="formTitle">
                    SignUp
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={usernameSign}
                    onChange={(e) => setUsernameSign(e.target.value)}
                    label='Username'
                    className='mainInput'
                    id='UsernameSign'
                    type='text'
                    size="lg" 
                    />
                    <label className="labelIcn" htmlFor="UsernameSign">
                        <FaRegUser />
                    </label>
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={emailSignValue}
                    onChange={(e) => setEmailSignValue(e.target.value)}
                    label='Email Address'
                    className='mainInput'
                    id='emailSign'
                    type='email'
                    size="lg" 
                    />
                    <label className="labelIcn" htmlFor="emailSign">
                        <FaRegEnvelope />
                    </label>
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={passSignValue}
                    onChange={(e) => setPassSignValue(e.target.value)}
                    label='Password'
                    className='mainInput'
                    id='passSign'
                    type='password'
                    size="lg" 
                    />
                    <label 
                    className="labelIcn" 
                    htmlFor="passSign" 
                    style={{cursor:"pointer"}}>
                        <FaEyeSlash />
                    </label>
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={passConfValue}
                    onChange={(e) => setPassConfValue(e.target.value)}
                    label='Confirm Password'
                    className='mainInput'
                    id='passConfirmSign'
                    type='password'
                    size="lg" 
                    />
                    <label 
                    className="labelIcn" 
                    htmlFor="passConfirmSign" 
                    style={{cursor:"pointer"}}>
                        <FaEyeSlash />
                    </label>
                </div>

                <div className="formItem">
                    <div className="logWith d-flex justify-content-center gap-1">
                        <span className='formItem'>SignUp With : </span>
                        <div className="withFacebook">
                            <FaFacebookSquare />
                        </div>
                        -
                        <div className="withGmail">
                            <FaGoogle />
                        </div>
                    </div>
                    <MDBBtn 
                    className='' 
                    outline 
                    tag={"button"}
                    type='reset'
                    value={"Reset"}
                    size="sm"
                    color='info' 
                    style={{border:"1px solid", borderRadius:"0px"}}
                    > <FaTrashAlt /> </MDBBtn>
                </div>
                
                <MDBBtn 
                className='mainButton' 
                tag='button' 
                type='submit' 
                value='Submit' 
                size="lg"
                onClick={handleSignUp}
                > Submit </MDBBtn>

                <div 
                className='d-flex justify-content-center align-items-center gap-2'
                style={{flexDirection:"column"}}
                >
                    <div className="formItem"> 
                        <span className="fromLink LoginLink">
                            Already Have One !
                        </span>
                    </div>
                </div>

            </form>
        </>
    )
}

export default SignUpForm