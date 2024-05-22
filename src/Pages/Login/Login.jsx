import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import BackVid from '../../Assets/Videos/144584-785095786_medium.mp4'






const Login = ({setAuthenticated}) => {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const handleLogin = () => {
        setAuthenticated(true);
        navigate("/");
    };


    return (
        <>
            <div className="mainFormWrapper Login-Page">
                <div className="video-background">
                    <video className='backVid' src={BackVid} autoPlay loop muted />
                </div>
                <form className="mainForm loginForm" >
                    <div className="formTitle">
                        Login
                    </div>

                    <MDBInput
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    label='Email Address'
                    className='mainInput'
                    id='emailLogin'
                    type='email'
                    size="lg" 
                    />

                    <MDBInput
                    value={passValue}
                    onChange={(e) => setPassValue(e.target.value)}
                    label='Password'
                    className='mainInput'
                    id='passLogin'
                    type='password'
                    size="lg" 
                    />

                    <div className="formItem">
                        <div>
                            <input type="checkbox" name="" id="saveCheck"/>
                            <label htmlFor="saveCheck" style={{marginLeft:"5px"}}>Save Password</label>
                        </div>
                        <span className=''>Forget Password ?</span>
                    </div>

                    <MDBBtn 
                    className='mainButton' 
                    tag='button' 
                    type='submit' 
                    value='Login' 
                    size="lg"
                    onClick={handleLogin}
                    > Login </MDBBtn>

                    <div className='d-flex justify-content-center gap-2'>
                        <div className="register formItem">
                            Don't have an account ? Register
                        </div>
                        <div className="logWith d-flex justify-content-center gap-1">
                            <div className="withFacebook">
                                <FaFacebookSquare />
                            </div>
                            -
                            <div className="withGmail">
                                <FaGoogle />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login