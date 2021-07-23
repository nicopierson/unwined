import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import AddCheckIn from './AddCheckIn';
import { getReviews } from '../../store/review';

import styles from './CheckIn.module.css';

const CheckIn = () => {
  const { wineId } = useParams();
  const dispatch = useDispatch();
  const [togglePage, setTogglePage] = useState(false);
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
    setRef(React.createRef())
  }, [togglePage]);

  return (
    <>
      <div>
        <CSSTransition
          in={togglePage}
          timeout={400}
          classNames='check_in_add'
          nodeRef={ref}
          unmountOnExit
        >
          <AddCheckIn 
            ref={ref}
            setTogglePage={setTogglePage}
          />
        </CSSTransition>
        <CSSTransition
          in={!togglePage}
          timeout={400}
          classNames='open_comment'
          nodeRef={ref}
          unmountOnExit
        >
          
          <button
            onClick={() => setTogglePage(true)}
          >
            Add Comment
          </button>
        </CSSTransition>
        <h2>Comments</h2>
        <div>
          {wineReviews &&
            wineReviews.map(review => (
              <div key={review.id}>
                <h3>{users[review.userId].username}</h3>
                <h3>{review.comments}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default CheckIn;