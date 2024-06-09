const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/getAllActions', actionController.getAllActions);
router.post('/insertAction', actionController.insertAction);
router.get('/handleSortingAsc', actionController.handleSortingAsc);
router.get('/handleSortingChosenOne', actionController.handleSortingChosenOne);
module.exports = router;
