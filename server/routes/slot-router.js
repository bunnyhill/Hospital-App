const express = require('express');
const controller = require('../controllers/slot-controller.js');

const router = express.Router();

router.get('/', controller.getSlot);

module.exports = router;
