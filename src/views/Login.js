import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../provider/AuthContext';
import { IMAGE_BASE_URL } from '../config';
import { DEFAULT_LOGO } from '../config/constant';

const Login = () => {
  const { setting } = useSelector((state) => state.setting);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to store the message
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setMessage('Login successful!');
      navigate('/', { state: { message: 'Login successful!' } });
    } catch (error) {
      setMessage(error.response.data.error);
      console.error('Error logging in', error);
    }
  };

  return (
    <>
      <section className='vh-100'>
        <div className='container pt-60 h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5 mb-50'>
              <div className='brand_logo_container'>
                <img
                  src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO}
                  alt='logo'
                  className='my-4'
                  style={{ height: '3rem', width: '12rem' }}
                />
              </div>

              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' className='img-fluid' alt='Sample image' />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <div className='justify-content-end d-flex mb-3'>
                <Link to='/' className='nav-bar-link'>
                  <FontAwesomeIcon icon='fa-solid fa-house' className='img-icon-left-menu rounded-circle mx-2' />
                </Link>
              </div>
              <div className='login-card'>
                <form onSubmit={handleSubmit} className='mt-2'>
                  {message && (
                    <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role='alert'>
                      {message}
                    </div>
                  )}

                  <div className='form-outline mb-4'>
                    <label className='form-label'>Email address</label>
                    <input
                      type='email'
                      id='form3Example3'
                      className='form-control form-control-lg'
                      placeholder='Enter a valid email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className='form-outline mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      id='form3Example4'
                      className='form-control form-control-lg'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='form-check my-0'>
                      <input className='form-check-input me-2' type='checkbox' value='' id='form2Example3' />
                      <label className='form-check-label'>Remember me</label>
                    </div>
                    <Link to='/forgot-password' className='text-body'>
                      Forgot password?
                    </Link>
                  </div>

                  <div className='text-center mt-4 pt-2'>
                    <button type='submit' className='btn btn-primary' style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                      Log In
                    </button>
                    <p className='small fw-bold mt-2 pt-1 mb-0'>
                      Don't have an account? <Link to='/register'>Register</Link> Or<Link to='/'> Home</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
