const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { WineType } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const wineTypeNotFoundError = (id) => {
  const err = Error("WineType not found");
  if (id !== undefined) {
    err.errors = [`WineType with id of ${id} could not be found.`];
  } else {
    err.errors = [`wineTypes could not be found.`];
  }
  err.title = "WineType not found.";
  err.status = 404;
  return err;
};

const wineTypePostError = () => {
  const err = Error("WineType could not be added");
  err.errors = [`WineType could not be added`];
  err.title = "WineType not added.";
  err.status = 404;
  return err;
};

const validateWineType = [
  check('type')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid wine type.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const wineTypes = await WineType.findAll({ limit: 10 });

    if (wineTypes) {
      return res.json({
        wineTypes,
      });
    } else {
      next(wineTypeNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const wineType = await WineType.findByPk(req.params.id);

    if (wineType) {
      return res.json({
        wineType,
      });
    } else {
      next(wineTypeNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateWineType,
  asyncHandler(async (req, res, next) => {
    const wineType = await WineType.findByPk(req.params.id);

    if (wineType) {
      await wineType.update(req.body);
  
      return res.json({
        wineType,
      });

    } else {
      next(wineTypeNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  validateWineType,
  asyncHandler(async (req, res, next) => {
    const wineType = await WineType.build(req.body);

    if (wineType) {
      await wineType.save();

      return res.json({
        wineType,
      });
    } else {
      next(wineTypePostError());
    }

  }),
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const wineType = await WineType.findByPk(req.params.id);

    if (wineType) {
      await wineType.destroy();

      return res.json({
        wineType, // or the id => wineType.id
      });
    } else {
      next(wineTypeNotFoundError(req.params.id));
    }
  }
));

module.exports = router;