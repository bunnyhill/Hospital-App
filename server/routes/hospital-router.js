const express = require('express');
const controller = require('../controllers/hospital-controller.js');

const router = express.Router();

router.get('/', controller.getHospital);
router.get('/:id', controller.getHospitalById);
router.post('/', controller.postHospital);

module.exports = router;
