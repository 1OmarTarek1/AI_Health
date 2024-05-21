import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './Login.css'






const Login = ({setAuthenticated}) => {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const handleLogin = () => {
        // Perform login logic...
        setAuthenticated(true);
        // Redirect to the Profile page after successful login
        navigate("/");
    };


    return (
        <>
            <div className="mainForm Login-Page">
                <form className="loginForm" >
                    <MDBInput
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    label='Email Address'
                    id='emailLogin'
                    type='email'
                    />

                    <MDBInput
                    value={passValue}
                    onChange={(e) => setPassValue(e.target.value)}
                    label='Password'
                    id='passLogin'
                    type='password'
                    />

                    <MDBBtn 
                    className='' 
                    tag='input' 
                    type='submit' 
                    value='Login' 
                    onClick={handleLogin}
                    />
                </form>
            </div>
        </>
    )
}

export default Login