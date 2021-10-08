const router = require('express').Router();
const {getAll, getById} = require('../controllers/breweryController');

router.get('/', getAll);
router.get('/brewery/:id', getById);


module.exports = router;
