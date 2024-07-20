const express = require('express');
const controller = require('../controllers/doctors-controller.js');

const router = express.Router();

router.get('/', controller.getDoctors);

module.exports = router;
