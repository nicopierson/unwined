const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

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

module.exports = router;