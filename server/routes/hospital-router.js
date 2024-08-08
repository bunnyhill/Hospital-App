const express = require('express');
const controller = require('../controllers/hospital-controller.js');

const router = express.Router();

router.get('/', controller.getHospital);
router.post('/', controller.postHospital);
router.get('/:id', controller.getHospitalById);

module.exports = router;
