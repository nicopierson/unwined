import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createReview } from '../../store/review';

import styles from './AddCheckIn.module.css';

const AddCheckIn = React.forwardRef(({ setTogglePage }, ref) => {
  const dispatch = useDispatch();
  const { wineId } = useParams();

  const [comments, setComments] = useState('');
  const [errorsArray, setErrorsArray] = useState('');

  const sessionUser = useSelector(state => state?.session.user);

  const handleAddCheckIn = async (e) => {
    e.preventDefault();

    const payload = {
      comments,
      userId: sessionUser.id,
      wineId, 
    };
    
    const newComment = await dispatch(createReview(payload));

    if (newComment?.errors || newComment?.errors?.length > 0) {
      console.error(newComment.errors)
    } else {
      console.log('Successfully added comment to the db: ', newComment);
      setTogglePage(false);
    }

  };

  useEffect(() => {
    const errors = [];

    if (comments?.length < 3) errors.push('Comments must have a minimum 3 characters.');
    if (comments?.length > 500) errors.push('Comments has a character limit of 500 characters.');

    setErrorsArray(errors);
  }, [dispatch, comments])
  
  return (
    <div>
      <h2>Add Check in Box</h2>
      <div className={styles.errors_container}>
        { errorsArray.length > 0 && errorsArray.map((error) => (
          <p className='errors' key={error}>
            {error}
          </p>
        ))}
      </div>
      <div> 
        <label htmlFor='review'>Check In</label>
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
        onClick={handleAddCheckIn}
      >
        Check In
      </button>
    </div>
  );
});

export default AddCheckIn;