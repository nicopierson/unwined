const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Wine } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const wineNotFoundError = (id) => {
  const err = Error("Wine not found");
  if (id !== undefined) {
    err.errors = [`Wine with id of ${id} could not be found.`];
  } else {
    err.errors = [`Wines could not be found.`];
  }
  err.title = "Wine not found.";
  err.status = 404;
  return err;
};

const winePostError = () => {
  const err = Error("Wine could not be added");
  err.errors = [`Wine could not be added`];
  err.title = "Wine not added.";
  err.status = 404;
  return err;
};

const validateWine = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 150 })
    .withMessage('Please provide a valid name.'),
  check('province')
    .isLength({ max: 100 })
    .withMessage('Please provide a province with at most 100 characters.'),
  check('country')
    .isLength({ max: 100 })
    .withMessage('Please provide a country with at most 100 characters.'),
  check('designation')
    .isLength({ max: 100 })
    .withMessage('Please provide a designation with at most 100 characters.'),
  check('region_1')
    .isLength({ max: 60 })
    .withMessage('Please provide a region 1 with at most 60 characters.'),
  check('region_2')
    .isLength({ max: 60 })
    .withMessage('Please provide a region 2 with at most 60 characters.'),
  check('userId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid User.'),
  check('colorTypeId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Color.'),
  check('wineryId')
    .isInt()
    .withMessage('Please provide valid Winery.'),
  check('wineTypeId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Wine Type.'),
  handleValidationErrors,
];

router.get(
  '/',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const wines = await Wine.findAll({ limit: 10 });

    if (wines) {
      return res.json(wines);
    } else {
      next(wineNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      return res.json(wine);
    } else {
      next(wineNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateWine,
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      await wine.update(req.body);
  
      return res.json(wine);

    } else {
      next(wineNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  // validateWine,
  asyncHandler(async (req, res, next) => {

    const wine = await Wine.build(req.body);

    if (wine) {
      await wine.save();

      return res.json(wine);
    } else {
      next(winePostError());
    }

  }),
);

router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      await wine.destroy();

      return res.json(wine);
    } else {
      next(wineNotFoundError(req.params.id));
    }
  }
));

module.exports = router;