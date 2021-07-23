import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';


import { deleteReview } from '../../store/review';

import FormCheckIn from './FormCheckIn';

const Comment = ({ review, username }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleComponent, setToggleComponent] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [toggleComponent]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
    history.push(`/wines/${review.wineId}`);
  };

  return (
    <div key={review.id}>
      <CSSTransition
        in={!toggleComponent}
        timeout={400}
        classNames='show_comment'
        unmountOnExit
        nodeRef={ref}
      >
        <div>
          <h3>{username}</h3>
          <h3>{review.comments}</h3>
          <button
            onClick={() => setToggleComponent(true)}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </CSSTransition>
      <CSSTransition
        in={toggleComponent}
        timeout={400}
        classNames='edit_comment'
        unmountOnExit
        nodeRef={ref}
      >
        <div>
          <FormCheckIn 
            setToggleComponent={setToggleComponent}
            username={username}
            review={review}
            method={`PUT`}
            title={`Edit Comment`}
            ref={ref}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Comment;