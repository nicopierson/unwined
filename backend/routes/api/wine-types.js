const express = require('express');
const asyncHandler = require('express-async-handler');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { WineType } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, searchNotFoundError } = require('../../utils/validation');

const router = express.Router();


const wineTypeNotFoundError = (id) => {
  const err = Error("WineType not found");
  if (id !== undefined) {
    err.errors = [`Wine variety with id of ${id} could not be found.`];
  } else {
    err.errors = [`Wine variety could not be found.`];
  }
  err.title = "Wine variety not found.";
  err.status = 404;
  return err;
};

const wineTypePostError = () => {
  const err = Error("Wine variety could not be added");
  err.errors = [`Wine variety could not be added`];
  err.title = "Wine variety not added.";
  err.status = 404;
  return err;
};

const validateWineType = [
  check('variety')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid wine variety.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const wineTypes = await WineType.findAll();

    if (wineTypes) {
      return res.json(wineTypes);
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
      return res.json(wineType);
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
  
      return res.json(wineType);

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

      return res.json(wineType);
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

      return res.json(wineType);
    } else {
      next(wineTypeNotFoundError(req.params.id));
    }
  }
));

// Search route to get wine types by name
router.get(
  '/search/:resource/:string',
  asyncHandler(async (req, res, next) => {
    const limit = 8; // only grab 8 at a time
    const resource = req.params.resource;
    let string = req.params.string;

    const wineTypes = await WineType.findAll({
      where: {
        [resource]: {
          [Op.iLike]: `%${string}%`
        }
      },
      limit: limit,
    });

    if (wineTypes) {
      return res.json(wineTypes);
    } else {
      next(searchNotFoundError('wineType'));
    }
  })
);

module.exports = router;