import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import FormCheckIn from './FormCheckIn';
import Comment from './Comment';
import { getReviews } from '../../store/review';

import styles from './CheckIn.module.css';

const CheckIn = () => {
  const { wineId } = useParams();
  const dispatch = useDispatch();
  const [toggleForm, setToggleForm] = useState(false);
  const [ref, setRef] = useState(React.createRef());


  //? What is the best way to retrieve the all reviews by a wine id?
  const wineReviews = useSelector((state) => {
    const reviewIds = state.wines[wineId]?.reviews;
    return reviewIds?.map(id => state.reviews[id])
  });

  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getReviews(wineId))
  }, [dispatch, wineId]);

  useEffect(() => {
    setRef(React.createRef());
  }, [toggleForm]);

  return (
    <div className={styles.checkin_background}>
      <div className={styles.checkin_container}>
        <div className={styles.header}>
          <CSSTransition
            in={!toggleForm}
            timeout={400}
            classNames='open_comment'
            nodeRef={ref}
          >
            <div className={styles.checkin_add}>
              <i
                className='fas fa-plus-circle'
                onClick={() => setToggleForm(true)}
              >
              </i>
            </div>
          </CSSTransition>
          <h2>Check in Activity</h2>
        </div>
        <CSSTransition
          in={toggleForm}
          timeout={400}
          classNames='check_in_add'
          nodeRef={ref}
          unmountOnExit
        >
          <FormCheckIn 
            ref={ref}
            setToggleForm={setToggleForm}
            label={`Add a Check In`}
            method={`POST`}
          />
        </CSSTransition>
        <div>
          {wineReviews &&
            wineReviews?.map(review => (
              <Comment 
              review={review}
              username={users[review.userId].username}
              key={review.id}
              />
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default CheckIn;