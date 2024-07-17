const express = require('express');
const controller = require('../controllers/prescription-countroller');

const router = express.Router();

router.get('/', controller.getPrescription);

module.exports = router;
