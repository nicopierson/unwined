const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const searchNotFoundError = (resource) => {
  const err = Error(`${resource} not found`);
  if (id !== undefined) {
    err.errors = [`${resource} could not be found.`];
  } else {
    err.errors = [`${resource} could not be found.`];
  }
  err.title = `${resource} not found.`;
  err.status = 404;
  return err;
};

module.exports = {
  handleValidationErrors,
  searchNotFoundError,
};