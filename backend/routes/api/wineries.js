const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Winery } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const wineryNotFoundError = (id) => {
  const err = Error("Winery not found");
  if (id !== undefined) {
    err.errors = [`Winery with id of ${id} could not be found.`];
  } else {
    err.errors = [`Wineries could not be found.`];
  }
  err.title = "Winery not found.";
  err.status = 404;
  return err;
};

const wineryPostError = () => {
  const err = Error("Winery could not be added");
  err.errors = [`Winery could not be added`];
  err.title = "Winery not added.";
  err.status = 404;
  return err;
};

const validateWinery = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 175 })
    .withMessage('Please provide a valid name.'),
  check('country')
    .isLength({ max: 60 })
    .withMessage('Please provide a country with at most 100 characters.'),
  check('ownerId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Owner.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const wineries = await Winery.findAll({ limit: 100 });

    if (wineries) {
      return res.json(wineries);
    } else {
      next(wineryNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const winery = await Winery.findByPk(req.params.id);

    if (winery) {
      return res.json(winery);
    } else {
      next(wineryNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateWinery,
  asyncHandler(async (req, res, next) => {
    const winery = await Winery.findByPk(req.params.id);

    if (winery) {
      await winery.update(req.body);
  
      return res.json(winery);

    } else {
      next(wineryNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  validateWinery,
  asyncHandler(async (req, res, next) => {
    const winery = await Winery.build(req.body);

    if (winery) {
      await winery.save();

      return res.json(winery);
    } else {
      next(wineryPostError());
    }

  }),
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const winery = await Winery.findByPk(req.params.id);

    if (winery) {
      await winery.destroy();

      return res.json(winery);
    } else {
      next(wineryNotFoundError(req.params.id));
    }
  }
));

module.exports = router;