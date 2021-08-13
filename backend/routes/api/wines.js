const express = require('express');
const asyncHandler = require('express-async-handler');

const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Wine, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, searchNotFoundError } = require('../../utils/validation');

const router = express.Router();

const limitPerPage = 8;

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

const wineLimitError = () => {
  const err = Error("Limit exceeded");
  err.errors = [`Cannot request more than 50 wines`];
  err.title = "Request failed.";
  err.status = 404;
  return err;
};

const validateWine = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 150 })
    .withMessage('Please provide a valid name.'),
  check('province')
    .isLength({ max: 100 })
    .withMessage('Please provide a province with at most 100 characters.'),
  check('country')
    .isLength({ max: 100 })
    .withMessage('Please provide a country with at most 100 characters.'),
  check('designation')
    .isLength({ max: 100 })
    .withMessage('Please provide a designation with at most 100 characters.'),
  check('region_1')
    .isLength({ max: 60 })
    .withMessage('Please provide a region 1 with at most 60 characters.'),
  check('region_2')
    .isLength({ max: 60 })
    .withMessage('Please provide a region 2 with at most 60 characters.'),
  check('userId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid User.'),
  check('colorTypeId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Color.'),
  check('wineryId')
    .isInt()
    .withMessage('Please provide valid Winery.'),
  check('wineTypeId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Please provide valid Wine Type.'),
  handleValidationErrors,
];

// Retrieve all wines from the database
// router.get(
//   '/',
//   // requireAuth,
//   asyncHandler(async (req, res, next) => {
//     const wines = await Wine.findAll({ limit: limitPerPage });

//     if (wines) {
//       return res.json(wines);
//     } else {
//       next(wineNotFoundError());
//     }
//   })
// );

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      return res.json(wine);
    } else {
      next(wineNotFoundError(req.params.id));
    }
  })
);

router.get(
  '/:id(\\d+)/reviews',
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id, {
      include: Review,
    });

    if (wine) {
      return res.json(wine.Reviews);
    } else {
      next(wineNotFoundError(req.params.id));
    }
  })
);

router.put(
  '/:id(\\d+)',
  requireAuth,
  validateWine,
  asyncHandler(async (req, res, next) => {
    const wine = await Wine.findByPk(req.params.id);

    if (wine) {
      await wine.update(req.body);
  
      return res.json(wine);

    } else {
      next(wineNotFoundError(req.params.id));
    }

  })
);

router.post(
  '/',
  // requireAuth,
  // validateWine,
  asyncHandler(async (req, res, next) => {

    const wine = await Wine.build(req.body);

    if (wine) {
      await wine.save();

      return res.json(wine);
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

      return res.json(wine);
    } else {
      next(wineNotFoundError(req.params.id));
    }
  }
));

// create the where and order query options for sequelize
//TODO PUT in search search util function if not directly connected to routes
const createQueryOptions = (attribute, order) => {
  if (!attribute || !order) return {};

  let orderObj; // initialize to empty object = orderObj = { attribute: {}, order: [] }
  if (order === 'desc') {
    orderObj = {
      order: [[attribute, 'DESC']] 
      // FAILED trying to make all attributes lowercase
      // Sequelize.fn('lower', Sequelize.col(attribute)) // try later
    };
  } else { // would have to return else if
    orderObj = {
      order: [[attribute, 'ASC']]
    };
  }
  
  const whereObj =  { // add conditional
    where: {
      [attribute]: {
        [Op.and]: {
          [Op.not]: '',
          [Op.not]: null,
        }
      },
    },
  }

  return { ...whereObj, ...orderObj};
};

// returns wines 8 at a time based on the page
//TODO change to be dynamic based on results per page variable
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    let { search, page, attribute, order: orders } = req.query;
    if (!page) page = 1;
    const offset = limitPerPage * (page - 1);
    // if (limit > 50) next(wineLimitError());
    
    let { where, order } = createQueryOptions(attribute, orders);

    if (search) {
      where = {
        ...where,
        // the attribute for the search is set to name
        name: {
          [Op.iLike]: `%${search}%`
        }
      };
    }

    const wines = await Wine.findAndCountAll({
      offset: offset,
      limit: limitPerPage,
      where: where ? where : {},
      order: order ? order : [],
    });

    return res.json({ ...wines, offset })
  })
);

// Search route to get wines by name for search bar by name
// change limitPerPage to CAPS = constant
router.get(
  '/search',
  asyncHandler(async (req, res, next) => {
    let { search, page, attribute, order: orders } = req.query;
    if (!page) page = 1;
    const offset = limitPerPage * (page - 1);// if (limit > 50) next(wineLimitError());

    const { where: whereCopy, order } = createQueryOptions(attribute, orders);
    // let where = whereCopy ? where : {};

    const where = { // refactor and put inside createQueryOptions
      ...whereCopy,
      [attribute]: {
        [Op.iLike]: `%${search}%`
      }
    };
    // console.log('where: ------------------------------------- ', where);

    // const attribute = req.params.attribute;
    // let string = req.params.string;

    const wines = await Wine.findAndCountAll({
      offset: offset,
      limit: limitPerPage,
      where: where ? where : {}, // can do in createQueryOptions
      order: order ? order : [],
    });

    if (wines) {
      return res.json(wines);
    } else {
      next(searchNotFoundError('wine'));
    }
  })
);

// order price or rating
//? Might not need route, but may change
// router.get(
//   '/search-order/:attribute/:operation/:value(\\d+)',
//   asyncHandler(async (req, res, next) => {
//     const attribute = req.params.attribute;
//     const operation = req.params.operation;
//     const value = req.params.value;

//     let wines;
//     if (operation === 'more') { 
//       wines = await Wine.findAll({
//         where: {
//           [attribute]: {
//             [Op.and]: {
//               [Op.gte]: value,
//               [Op.not]: null,
//             },
//           },
//         },
//         limit: limitPerPage,
//         order: [[attribute, 'DESC']],
//         // attributes: ['id', 'name', 'updated_at'] // if only want certain columns
//       });
//     } else if (operation === 'less') {
//       wines = await Wine.findAll({
//         where: {
//           [attribute]: {
//             [Op.and]: {
//               [Op.lte]: value,
//               [Op.not]: null,
//             },
//           },
//         },
//         limit: limitPerPage,
//         order: [[attribute, 'DESC']],
//       });
//     }

//     if (wines) {
//       return res.json(wines);
//     } else {
//       next(searchNotFoundError('wine'));
//     }
//   })
// );

module.exports = router;