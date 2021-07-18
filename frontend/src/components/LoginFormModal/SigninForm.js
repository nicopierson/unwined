import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import styles from './FormModal.module.css';

function SigninForm({ toggle }) {
  const { toggleSignForm, setToggleSignForm } = toggle;
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );
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
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder='Username'
            />
          </div>
          <div className={styles.form__input_field}>
            <i className='fa fa-envelope'></i>
            <input
              type='text'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
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

export default SigninForm;