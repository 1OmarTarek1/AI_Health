import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa6';
import './LoginForm.css'



const LoginForm = ({setAuthenticated}) => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        setAuthenticated(true);
        navigate("/Home");
    };

    return (
        <>
            <form className="mainForm loginForm" >

                <div className="formTitle">
                    Login
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    label='Email Address'
                    className='mainInput'
                    id='emailLogin'
                    type='email'
                    size="lg" 
                    />
                    <label className="labelIcn" htmlFor="emailLogin">
                        <FaRegEnvelope />
                    </label>
                </div>

                <div style={{position:"relative"}}>
                    <MDBInput
                    value={passValue}
                    onChange={(e) => setPassValue(e.target.value)}
                    label='Password'
                    className='mainInput'
                    id='passLogin'
                    type='password'
                    size="lg" 
                    />
                    <label 
                    className="labelIcn" 
                    htmlFor="passLogin" 
                    style={{cursor:"pointer"}}>
                        <FaEyeSlash />
                    </label>
                </div>

                <div className="formItem">
                    <div>
                        <input 
                        type="checkbox" 
                        id="saveCheck" 
                        style={{
                            position:"relative", 
                            top:"1.5px", 
                            marginInline:"4px"
                        }}
                        />
                        <label htmlFor="saveCheck">Save Password</label>
                    </div>
                    <span className='fromLink'>Forget Password ?</span>
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
                    <div className="formItem">
                        Don't Have an Account ? 
                        <span className="fromLink Register" style={{marginLeft:"5px"}}>
                            Register
                        </span>
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
        </>
    )
}

export default LoginForm