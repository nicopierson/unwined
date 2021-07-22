import { csrfFetch } from './csrf';

const LOAD = 'reviews/LOAD';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const ADD_ONE = 'reviews/ADD_ONE';

export const loadReview = (reviews) => ({
  type: LOAD,
  reviews,
});

// this does not work - need to fix the associations
export const removeReview = (id) => ({
  type: REMOVE_REVIEW,
  reviewId: id,
});

export const addOneReview = (review) => ({
  type: ADD_ONE,
  review,
});

export const getReview = () => async dispatch => {
  const res = await fetch(`/api/reviews`);

  const reviews = await res.json();
  if (res.ok) {
    console.log(reviews);
    dispatch(loadReview(reviews));
  }
  return reviews;
};

export const getOneReview = (id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}`);

  const review = await res.json();
  if (res.ok) {
    dispatch(addOneReview(review));
  }
  return review;
};

export const createReview = (payload) => async dispatch =>{
  const res = await csrfFetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const newReview = await res.json();
  if(res.ok){
    dispatch(addOneReview(newReview))
  }
 
  return newReview
};

export const editReview = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const editedReview = await res.json();
  if (res.ok) {
    dispatch(addOneReview(editedReview));
  }

  return editedReview;

};

export const deleteReview = (id) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });

  const deletedReview = await res.json();
  if (res.ok) {
    dispatch(removeReview(id));
  }

  return deletedReview;

};

const sortList = (reviews) => {

  reviews.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return reviews.map(review => review.id);
};

const initialState = { list: [] };

const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allReview = {};
      action.reviews.forEach((review) => {
        allReview[review.id] = review;
      });
      return { 
        ...allReview, 
        ...state,
        list: sortList(action.reviews) 
      };
    }
    case ADD_ONE: {
      if (!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review
        };
        const reviewList = newState.list.map(id => newState[id]);
        reviewList.push(action.review);
        newState.list = sortList(reviewList);
        return newState;
      }
      return {
        ...state,
        [action.review.id]: {
          ...state[action.review.id],
          ...action.review,
        }
      };
    }
    case REMOVE_REVIEW: {
      const newState = { 
        ...state
      };
      const reviewList = newState.list.filter(reviewId => reviewId !== action.reviewId);
      newState.list = reviewList;
      delete newState[action.reviewId];

      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;