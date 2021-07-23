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
      <div>
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
            title={`Check In`}
            label={`comment`}
            method={`POST`}
          />
        </CSSTransition>
        <CSSTransition
          in={!toggleForm}
          timeout={400}
          classNames='open_comment'
          nodeRef={ref}
          unmountOnExit
        >
          <div>
            <button
              onClick={() => setToggleForm(true)}
            >
              Add Comment
            </button>
          </div>
        </CSSTransition>
        <h2>Comments</h2>
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
  );
};

export default CheckIn;