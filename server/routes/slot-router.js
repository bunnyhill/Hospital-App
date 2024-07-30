const express = require('express');
const controller = require('../controllers/slot-controller.js');

const router = express.Router();

router.get('/', controller.getSlotsByDoctorId);
router.post('/', controller.postSlot);

module.exports = router;
