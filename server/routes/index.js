const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');

/* GET home page. */
router.delete('/delete-all', (req, res, next) => {
  console.log('delete all');
  dataService.deleteAll(req, res, next);
});

router.delete('/delete/:id', (req, res, next) => {
  dataService.deleteItem(req, res, next);
});

router.get('/list', async (req, res, next) => {
  await dataService.getAll(req, res, next);
});

router.post('/create', (req, res, next) => {
  dataService.createItem(req, res, next);
});

module.exports = router;
