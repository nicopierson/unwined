import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createReview, editReview } from '../../store/review';

import styles from './FormCheckIn.module.css';

const FormCheckIn = React.forwardRef(({ setToggleForm, label, username, review, method }, ref) => {
  const dispatch = useDispatch();
  const { wineId } = useParams();

  const [comments, setComments] = useState(review ? review.comments : '');
  const [errorsArray, setErrorsArray] = useState([]);

  // use later to disable edit buttons for users who didn't make comment
  const sessionUser = useSelector(state => state?.session.user);

  const handleFormCheckIn = async (e) => {
    e.preventDefault();
    const id = review ? review.id : null;
    const userId = review ? review.userId : sessionUser.id; 

    const payload = {
      id,
      comments,
      userId,
      wineId: +wineId, 
    };
    
    let newComment;
    if (method === 'PUT') {
      newComment = await dispatch(editReview(payload));
    } else {
      delete payload.id;
      newComment = await dispatch(createReview(payload));
    }

    if (newComment.errors) {
      console.error(newComment.errors);
    } else {
      // console.log('Successfully added comment to the db: ', newComment);
      setToggleForm(false);
    }

  };

  const handleCancel = (event) => {
    event.preventDefault();

    setToggleForm(false);
  };

  useEffect(() => {
    const errors = [];

    if (comments?.length < 3) errors.push('Comments must have a minimum 3 characters.');
    if (comments?.length > 500) errors.push('Comments has a character limit of 500 characters.');

    setErrorsArray(errors);
  }, [dispatch, comments]);
  
  return (
    <div className={styles.form_container}>
      <div className={styles.form}>
        {/* <div className={styles.errors_container}>
          { errorsArray.length > 0 && errorsArray.map((error) => (
            <p className='errors' key={error}>
              {error}
            </p>
          ))}
        </div> */}
        <div> 
          <h4>{username ? username : label}</h4>
          <label htmlFor='comments'></label>
          <textarea
            onChange={(event) => setComments(event.target.value)}
            value={comments}
            id='comments'
            name='comments'
            placeholder='Check In'
          >
          </textarea>
        </div>
        <button
          className={styles.cancel}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={styles.check_in}
          onClick={handleFormCheckIn}
        >
          Check In
        </button>
      </div>
    </div>
  );
});

export default FormCheckIn;