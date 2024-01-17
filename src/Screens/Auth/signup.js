import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"


const AdminSignup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

  

    console.log(formData.password);

    useEffect(() => {
        document.title = 'Tim User | Login';
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.querySelector('.loaderBox').classList.remove("d-none");
        
        const formDataMethod = new FormData();
        formDataMethod.append('name', formData.name);
        formDataMethod.append('email', formData.email);
        formDataMethod.append('password', formData.password);
        console.log(formData)

        const apiUrl = 'https://custom.mystagingserver.site/Tim-WDLLC/public/api/author-register';


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });

            if (response.ok) {
               
                const responseData = await response.json();
                localStorage.setItem('loginUser', responseData.data.token);
                console.log('reg Response:', responseData);
                document.querySelector('.loaderBox').classList.add("d-none");
                navigate('/')
                
            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                
                const responseData = await response.json();
                alert(responseData.message)
                console.error('reg failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }
    };


    return (
        <>
            <AuthLayout authTitle='Sign-up' authPara='Create Your Account'>
                <form onSubmit={handleSubmit}>
                  
                <CustomInput
                        label='Name'
                        required
                        id='userName'
                        type='name'
                        placeholder='Enter Your Name  '
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, name: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput
                        label='Email Address'
                        required
                        id='userEmail'
                        type='email'
                        placeholder='Enter Your Email Address'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                      
                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                       
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        {/* <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold'>Remember Me</label>
                        </div> */}
                        {/* <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link> */}
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='register' type='submit' />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default AdminSignup
