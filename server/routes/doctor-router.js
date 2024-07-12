const express = require('express');
const controller = require('../controllers/doctor-controller.js');

const router = express.Router();

router.get('/', controller.getDoctor);
router.get('/:id', controller.getDoctorById);
router.post('/', controller.postDoctor);

module.exports = router;
