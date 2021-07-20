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
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const wines = await Wine.findAll({ limit: 10 });

    if (wines) {
      return res.json({
        wines,
      });
    } else {
      next(wineNotFoundError());
    }
  })
);

router.get(
  '/:id(\\id+)',
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      return res.json({
        wine,
      });
    } else {
      next(wineNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id',
  requireAuth,
  validateWine,
  asyncHandler(async (req, res, next) => {
    const {
      name,
      imageUrl,
      description,
      province,
      country,
      price,
      rating,
      designation,
      region_1,
      region_2,
      userId,
      wineryId,
      colorTypeId,
      wineTypeId,
    } = req.body;

    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      await wine.update({
        name,
        imageUrl,
        description,
        province,
        country,
        price,
        rating,
        designation,
        region_1,
        region_2,
        userId,
        wineryId,
        colorTypeId,
        wineTypeId,
      });
  
      return res.json({
        wine,
      });

    } else {
      next(wineNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  requireAuth,
  validateWine,
  asyncHandler(async (req, res, next) => {
    const {
      name,
      imageUrl,
      description,
      province,
      country,
      price,
      rating,
      designation,
      region_1,
      region_2,
      userId,
      wineryId,
      colorTypeId,
      wineTypeId,
    } = req.body;

    const wine = await Wine.build({ 
      name,
      imageUrl,
      description,
      province,
      country,
      price,
      rating,
      designation,
      region_1,
      region_2,
      userId,
      wineryId,
      colorTypeId,
      wineTypeId,
    });

    if (wine) {
      await wine.save();

      return res.json({
        wine,
      });
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

      return res.json({
        wine, // or the id => wine.id
      });
    } else {
      next(wineNotFoundError(req.params.id));
    }
  }
));

module.exports = router;