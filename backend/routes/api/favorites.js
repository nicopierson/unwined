const express = require("express");
const asyncHandler = require('express-async-handler');

const { Favorite } = require("../db/models");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const allFavoritesNotFoundError = () => {
  const err = Error("Favorite not found");
  err.errors = [`Favorite was not found.`];
  err.title = "Favorite not found.";
  err.status = 404;
  return err;
};

router.get("/",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const favorites = await Favorite.findAll();
    if (favorites) {
      res.json({ favorites });
    } else {
      next(allFavoritesNotFoundError());
    }
  })
);

const favoriteNotFoundError = (id) => {
  const err = Error("Favorite not found");
  err.errors = [`Favorite with id of ${id} could not be found.`];
  err.title = "Favorite not found.";
  err.status = 404;
  return err;
};

const validateFavorite = [
  check("userId")
  .exists({ checkFalsy: true })
  .withMessage("UserId can't be empty."),
  check("wineId")
  .exists({ checkFalsy: true })
  .withMessage("WineId can't be empty."),
  check("UserId")
  .isInt()
  .withMessage("UserId has to be an integer"),
  check("wineId")
  .isInt()
  .withMessage("WineId has to be an integer"),
  handleValidationErrors,
];

router.post('/',
  // requireAuth, //! require authentication for production
  validateFavorite,
  asyncHandler(async (req, res, next) => {
    const { userId, wineId } = req.body; 

    const favorite = await Favorite.create({
      userId,
      wineId,
    });

    if (favorite) {
      res.json({ favorite });
    } else {
      next(favoriteNotFoundError(req.params.id));
    }
}));


router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const favorite = await Favorite.findByPk(req.params.id);

    if (favorite) {
      await favorite.destroy();

      return res.json(favorite);
    } else {
      next(favoriteNotFoundError(req.params.id));
    }
  }
));

module.exports = router;