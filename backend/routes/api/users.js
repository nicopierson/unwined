const express = require('express');
const asyncHandler = require('express-async-handler');

const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
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

const userNotFoundError = (id) => {
  const err = Error("User not found");
  if (id !== undefined) {
    err.errors = [`User with id of ${id} could not be found.`];
  } else {
    err.errors = [`User could not be found.`];
  }
  err.title = "User not found.";
  err.status = 404;
  return err;
};

const userPostError = () => {
  const err = Error("User could not be added");
  err.errors = [`User could not be added`];
  err.title = "User not added.";
  err.status = 404;
  return err;
};

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const users = await User.findAll({ limit: 10 });

    if (users) {
      return res.json(users);
    } else {
      next(userNotFoundError());
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      return res.json(user);
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  // requireAuth,
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.update(req.body);
  
      return res.json(user);

    } else {
      next(userNotFoundError(req.params.id));
    }

  })
);

//TODO test the error handlers, are they necessary?
// router.post(
//   '/',
//   // requireAuth,
//   validateSignup,
//   asyncHandler(async (req, res, next) => {
//     const user = await User.signup(req.body);

//     if (user) {
//       await user.save();

//       return res.json(user);
//     } else {
//       next(userPostError());
//     }

//   }),
// );


router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });

  }),
);

router.delete(
  '/:id(\\d+)',
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.destroy();

      return res.json(user);
    } else {
      next(userNotFoundError(req.params.id));
    }
  }
));

// Search route to get users by name
router.get(
  '/search/:resource/:string',
  asyncHandler(async (req, res, next) => {
    const limit = 8; // only grab 8 at a time
    const resource = req.params.resource;
    let string = req.params.string;

    const users = await User.findAll({
      where: {
        [resource]: {
          [Op.iLike]: `%${string}%`
        }
      },
      limit: limit,
    });

    if (users) {
      return res.json(users);
    } else {
      next(searchNotFoundError('user'));
    }
  })
);

module.exports = router;