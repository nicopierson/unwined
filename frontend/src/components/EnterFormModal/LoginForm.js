import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './FormModal.module.css';

const LoginForm = React.forwardRef((props, ref) => {
  const history = useHistory();
  const { toggleSignForm, setToggleSignForm } = props.toggle;
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => history.push('/dashboard'))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(() => history.push('/dashboard'))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>
        <div className={styles.modal_content__sign_in_container} ref={ref}>
          <form onSubmit={handleSubmit} className={styles.form_sign_in}>
            <h2 className={styles.form__title}>Sign In</h2>
            <ul className={styles.form__errors}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className={styles.form__input_field}>
              <i className='fa fa-user'></i>
              <input
                type='text'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder='Username or Email'
              />
            </div>
            <div className={styles.form__input_field}>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </div>
            <span>
              <button 
                type='submit' 
                className={styles.form__submit_btn}
              >
                Log In
              </button>
              <button 
                type='button' 
                className={styles.form__submit_btn}
                onClick={handleDemoLogin}
              >
                Demo Login
              </button>
            </span>
            <p className={styles.form_text__switch}>
              Or <li 
                className={styles.form_link__switch} 
                onClick={() => setToggleSignForm(!toggleSignForm)}>Sign up
                </li> if you don't have an account
            </p>
          </form>
        </div>
    </>
  );
});

export default LoginForm;