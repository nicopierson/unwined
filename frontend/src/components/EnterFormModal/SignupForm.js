import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as sessionActions from '../../store/session';

import styles from './FormModal.module.css';

function SignupForm({ toggle }) {
  const { toggleSignForm, setToggleSignForm } = toggle;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <div className={styles.modal_content__left_container}>
        <form onSubmit={handleSubmit} className={styles.form_left}>
          <h2 className={styles.form__title}>Sign Up</h2>
          <ul className={styles.form__errors}>
            {errors.map((error, idx) => (
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
          <button 
            type='submit' 
            className={styles.form__submit_btn}
          >
            Sign Up
          </button>
            <p className={styles.form_text__signup}>
            Or <li 
              className={styles.form_link__signup} 
              onClick={() => setToggleSignForm(!toggleSignForm)}>Sign in
              </li> if you are already one of us
          </p>
        </form>
      </div>
    </>
  );
}

export default SignupForm;