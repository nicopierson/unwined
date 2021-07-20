const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Wine } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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

router .get(
  '/',
  asyncHandler(async (req, res) => {
    const wines = await Wine.findAll({ limit: 10 });

    return res.json({
      wines,
    });
  })
);

router.post(
  '/',
  validateWine,
  asyncHandler(async (req, res) => {
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
    }

  }),
);

// router.delete(
//   '/',
//   (req, res) => {
    
//   }
// );

module.exports = router;