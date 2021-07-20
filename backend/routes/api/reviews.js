const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const reviewNotFoundError = (id) => {
  const err = Error("Review not found");
  if (id !== undefined) {
    err.errors = [`Review with id of ${id} could not be found.`];
  } else {
    err.errors = [`reviews could not be found.`];
  }
  err.title = "Review not found.";
  err.status = 404;
  return err;
};

const reviewPostError = () => {
  const err = Error("Review could not be added");
  err.errors = [`Review could not be added`];
  err.title = "Review not added.";
  err.status = 404;
  return err;
};

const validateReview = [
  check('comments')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid comments.'),
  check('userId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid User.'),
  check('wineId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Wine.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const reviews = await Review.findAll({ limit: 10 });

    if (reviews) {
      return res.json(reviews);
    } else {
      next(reviewNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const review = await Review.findByPk(req.params.id);

    if (review) {
      return res.json(review);
    } else {
      next(reviewNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const review = await Review.findByPk(req.params.id);

    if (review) {
      await review.update(req.body);
  
      return res.json(review);

    } else {
      next(reviewNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const review = await Review.build(req.body);

    if (review) {
      await review.save();

      return res.json(review);
    } else {
      next(reviewPostError());
    }

  }),
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const review = await Review.findByPk(req.params.id);

    if (review) {
      await review.destroy();

      return res.json(review);
    } else {
      next(reviewNotFoundError(req.params.id));
    }
  }
));

module.exports = router;