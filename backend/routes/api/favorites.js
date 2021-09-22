const express = require('express');
const asyncHandler = require('express-async-handler');

const { Favorite } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const allFavoritesNotFoundError = () => {
  const err = Error("Favorite not found");
  err.errors = [`Favorite was not found.`];
  err.title = "Favorite not found.";
  err.status = 404;
  return err;
};

const favoriteExistsError = () => {
  const err = Error("Favorite already exists");
  err.errors = [`Favorite already exists.`];
  err.title = "Favorite Exists.";
  err.status = 404;
  return err;
};

const favoriteNotFoundError = (id) => {
  const err = Error("Favorite not found");
  err.errors = [`Favorite with id of ${id} could not be found.`];
  err.title = "Favorite not found.";
  err.status = 404;
  return err;
};

router.get("/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const favorites = await Favorite.findAll();
    if (favorites) {
      res.json({ favorites });
    } else {
      next(allFavoritesNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const favorite = await Favorite.findByPk(req.params.id);
    if (favorite) {
      res.json(favorite);
    } else {
      next(favoriteNotFoundError(req.params.id));
    }
  })
);

router.get(
  '/users/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const favorites = await Favorite.findAll({
      where: {
        userId: req.params.id,
      }
    });
    if (favorites) {
      res.json({ favorites });
    } else {
      next(favoriteNotFoundError(req.params.id));
    }
  })
);

const validateFavorite = [
  check("userId")
  .exists({ checkFalsy: true })
  .withMessage("UserId can't be empty."),
  check("wineId")
  .exists({ checkFalsy: true })
  .withMessage("WineId can't be empty."),
  check("userId")
  .isInt()
  .withMessage("UserId has to be an integer"),
  check("wineId")
  .isInt()
  .withMessage("WineId has to be an integer"),
  handleValidationErrors,
];

router.post('/',
  requireAuth, 
  validateFavorite,
  asyncHandler(async (req, res, next) => {
    const { userId, wineId } = req.body; 

    const favDuplicate = await Favorite.findOne({
        where: {
            [Op.and]: [
                {
                    userId: {
                        [Op.eq]: userId,
                    }
                },
                {
                    wineId: {
                        [Op.eq]: wineId,
                    }
                }
            ]
        }
    });

    // favorite duplicate will be null if not found, so throw error
    if (favDuplicate === null || Object.keys(favDuplicate).length === 0) {
        const favorite = await Favorite.create({
          userId,
          wineId,
        });
        
        if (favorite) {
          return res.json(favorite);
        } else {
          next(favoriteNotFoundError(req.params.id));
        }
    } else {
        next(favoriteExistsError());
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