const express = require('express');
const controller = require('../controllers/doctor-controller.js');
const upload = require('../middlewares/imageUpload.js');
const checkToken = require('../middlewares/checkToken.js');

const router = express.Router();

router.post('/sign-up', upload.single('image'), controller.signupDoctor);
router.post('/login', controller.loginDoctor);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/:id', checkToken(['doctor']), controller.getDoctorById);

module.exports = router;
