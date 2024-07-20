const express = require('express');
const controller = require('../controllers/doctor-controller.js');
const upload = require('../middlewares/imageUpload.js');

const router = express.Router();

router.post('/sign-up', upload.single('file'), controller.signupDoctor);
router.post('/login', controller.loginDoctor);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/:id', controller.getDoctorById);

module.exports = router;
