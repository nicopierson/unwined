const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const winesRouter = require('./wines.js');
const wineriesRouter = require('./wineries');
const reviewsRouter = require('./reviews');
const wineTypesRouter = require('./wine-types');
const colorTypesRouter = require('./color-types');
const favoritesRouter = require('./favorites');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/wines', winesRouter);
router.use('/wineries', wineriesRouter);
router.use('/reviews', reviewsRouter);
router.use('/wine-types', wineTypesRouter);
router.use('/color-types', colorTypesRouter);
router.use('/favorites', favoritesRouter);

router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;