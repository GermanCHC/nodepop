'use strict';

const express = require('express');
const router = express.Router();

const Classified = require('../../models/Classified');
const jwtAuth = require('../../lib/jwtAuth');

const localConfig = require('../../localConfig');

//All router need authentication
router.use(jwtAuth());

/**
 *  GET /
 * Obtains a list of classifieds
 */
router.get('/', async (req, res, next) => {
  try {
    const filter = fillFilter(req);
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields= req.query.fields;
    const sort = req.query.sort;
    
    const classifieds = await Classified.list(filter, skip, limit, fields, sort);
    res.json({
      success: true,
      result: classifieds
    });
  } catch (err) {
    next(err);
  }
});

/**
 *  GET /
 * Obtains a list of tags available
 */
router.get('/tags', (req, res, next)=>{
  try {
    const tags = localConfig.tagsList.tags;
     
    res.json({
      success: true,
      result: tags
    });
  } catch (err) {
    next(err);
  }
    
});

/**
 * Function to fill filter with the request data
 * @param {returns filter object} req 
 */
function fillFilter(req) {
  const name = req.query.name;
  const sell = req.query.sell;
  const price = req.query.price;
  const tags = req.query.tags;

  // Create empty filter
  const filter = {};
  if (name) {
    filter.name = name;
  }
  if (sell) {
    filter.sell = sell;
  }
  if (price) {
    filter.price = price;
  }
  if (tags) {
    filter.tags = tags;
  }
  return filter;
}

module.exports = router;