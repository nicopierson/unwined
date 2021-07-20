const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { ColorType } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const colorTypeNotFoundError = (id) => {
  const err = Error("ColorType not found");
  if (id !== undefined) {
    err.errors = [`Color with id of ${id} could not be found.`];
  } else {
    err.errors = [`Color could not be found.`];
  }
  err.title = "Color not found.";
  err.status = 404;
  return err;
};

const colorTypePostError = () => {
  const err = Error("Color could not be added");
  err.errors = [`Color could not be added`];
  err.title = "Color not added.";
  err.status = 404;
  return err;
};

const validateColorType = [
  check('color')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid color type.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const colorTypes = await ColorType.findAll({ limit: 10 });

    if (colorTypes) {
      return res.json({
        colorTypes,
      });
    } else {
      next(colorTypeNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const colorType = await ColorType.findByPk(req.params.id);

    if (colorType) {
      return res.json({
        colorType,
      });
    } else {
      next(colorTypeNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateColorType,
  asyncHandler(async (req, res, next) => {
    const colorType = await ColorType.findByPk(req.params.id);

    if (colorType) {
      await colorType.update(req.body);
  
      return res.json({
        colorType,
      });

    } else {
      next(colorTypeNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  validateColorType,
  asyncHandler(async (req, res, next) => {
    const colorType = await ColorType.build(req.body);

    if (colorType) {
      await colorType.save();

      return res.json({
        colorType,
      });
    } else {
      next(colorTypePostError());
    }

  }),
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const colorType = await ColorType.findByPk(req.params.id);

    if (colorType) {
      await colorType.destroy();

      return res.json({
        colorType, // or the id => colorType.id
      });
    } else {
      next(colorTypeNotFoundError(req.params.id));
    }
  }
));

module.exports = router;