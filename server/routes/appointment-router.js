const express = require('express');
const controller = require('../controllers/appointment-controller.js');

const router = express.Router();

router.get('/', controller.getAppointment);

module.exports = router;
