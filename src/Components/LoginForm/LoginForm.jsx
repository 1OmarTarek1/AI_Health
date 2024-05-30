import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ setAuthenticated, showPassword, setShowPassword, username, setUsername }) => {
    // const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/getfit/login/', {
                username: username,
                password: passValue
            });
            
            const token = response.data.jwt;
            // Store token in cookies or local storage
            document.cookie = `jwt=${token}; path=/`;


            setAuthenticated(true);
            navigate("/Home");
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setErrors(error.response.data.detail);
            } else {
                setErrors('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <>
            <form className="mainForm loginForm" onSubmit={handleLogin}>
                <div className="formTitle">
                    Login
                </div>

                <div style={{ position: "relative" }}>
                    <MDBInput
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label='Username'
                        className='mainInput'
                        id='emailLogin'
                        type='text'
                        size="lg"
                    />
                    <label className="labelIcn" htmlFor="emailLogin">
                        <FaRegUser />
                    </label>
                </div>

                <div style={{ position: "relative" }}>
                    <MDBInput
                        value={passValue}
                        onChange={(e) => setPassValue(e.target.value)}
                        label='Password'
                        className='mainInput'
                        id='passLogin'
                        type={showPassword ? 'text' : 'password'}
                        size="lg"
                    />
                    <label
                        className="labelIcn"
                        htmlFor="passLogin"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </label>
                </div>

                <div className="" style={{position:"relative"}}>
                    <div className="formItem" style={{marginBottom:"5px"}}>
                        <div>
                            <input
                                type="checkbox"
                                id="saveCheck"
                                style={{
                                    position: "relative",
                                    top: "1.5px",
                                    marginInline: "4px"
                                }}
                            />
                            <label htmlFor="saveCheck">Save Password</label>
                        </div>
                        <span className='fromLink'>Forget Password ?</span>
                    </div>
                    {errors && <p className="error" style={{margin:"0", paddingLeft:"3px"}}>{errors}</p>}
                </div>

                <MDBBtn
                    className='mainButton'
                    tag='button'
                    type='submit'
                    value='Login'
                    size="lg"
                > Login </MDBBtn>

                <div className='d-flex justify-content-center gap-2'>
                    <div className="formItem">
                        Don't Have an Account ?
                        <span className="fromLink Register" style={{ marginLeft: "5px" }}>
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
    );
}

export default LoginForm;
