import { csrfFetch } from './csrf';

export const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
export const ADD_REVIEW = 'reviews/ADD_REVIEW';

export const loadReview = (reviews, wineId) => ({
  type: LOAD_REVIEW,
  reviews,
  wineId,
});

// this does not work - need to fix the associations
export const removeReview = (reviewId, wineId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  wineId,
});

export const addOneReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const getReviews = (wineId) => async dispatch => {
  const res = await fetch(`/api/wines/${wineId}/reviews`);

  const reviews = await res.json();
  if (res.ok) {
    dispatch(loadReview(reviews, wineId));
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

export const deleteReview = (reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  const deletedReview = await res.json();
  if (res.ok) {
    dispatch(removeReview(reviewId, deleteReview.wineId));
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

const initialState = { list: [], userId: [] };

const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_REVIEW: {
      const allReview = {};
      action.reviews.forEach((review) => {
        allReview[review.id] = review;
      });
      const newUserId = action.reviews.map((review) => {
        return review.userId;
      });
      return { 
        ...allReview, 
        ...state,
        list: sortList(action.reviews),
        userId: newUserId,
      };
    }
    case ADD_REVIEW: {
      if (!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review
        };
        const reviewList = newState.list.map(id => newState[id]);
        reviewList.push(action.review);
        newState.list = sortList(reviewList);
        newState.userId = newState.userId.map(userId => userId);
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
      newState.list = newState.list.filter(userId => userId !== action.reviewId)
      delete newState[action.reviewId];

      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;