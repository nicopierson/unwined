import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import styles from './FormModal.module.css';

const SignupForm = React.forwardRef((props, ref) => {
  const history = useHistory();
  const { toggleSignForm, setToggleSignForm } = props.toggle;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      const data = await dispatch(sessionActions.signup({ email, username, password }));

      if (data.errors && data.errors.length > 0) {
        return setErrors(data.errors);
      } else {
        history.push('/dashboard');
      }
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
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
      <div className={styles.modal_content__sign_up_container} ref={ref}>
        <form onSubmit={handleSubmit} className={styles.form_sign_up}>
          <h2 className={styles.form__title}>Sign Up</h2>
          <ul className={styles.form__errors}>
            {errors.length > 0 && errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className={styles.form__input_field}>
            <i className='fa fa-user'></i>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Username'
            />
          </div>
          <div className={styles.form__input_field}>
            <i className='fa fa-envelope'></i>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
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
          <div className={styles.form__input_field}>
            <i className='fas fa-lock'></i>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder='Confirm Password'
            />
          </div>
          <span>
            <button 
              type='submit' 
              className={styles.form__submit_btn}
            >
              Sign Up
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
              onClick={() => setToggleSignForm(!toggleSignForm)}>Sign in
              </li> if you are already one of us
          </p>
        </form>
      </div>
    </>
  );
});

export default SignupForm;