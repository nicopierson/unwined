import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import styles from './LoginFormModal.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
    <form onSubmit={handleSubmit} className={styles.form}>
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
      <button type='submit' className={styles.form__submit_btn}>Log In</button>
    </form>

    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.signup_form__title}>Sign Up</h2>
      <ul className={styles.signup_form__errors}>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className={styles.signup_form__input_field}>
        <i className='fa fa-user'></i>
        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder='Username'
        />
      </div>
      <div className={styles.signup_form__input_field}>
        <i className='fa fa-envelope'></i>
        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder='Email'
        />
      </div>
      <div className={styles.signup_form__input_field}>
        <i className='fas fa-lock'></i>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
      </div>
      <button type='submit' className={styles.signup_form__submit_btn}>Sign Up</button>
    </form>
    </>
  );
}

export default LoginForm;