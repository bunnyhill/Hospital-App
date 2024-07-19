const express = require('express');
const controller = require('../controllers/doctor-controller.js');
const upload = require('../middlewares/imageUpload.js');

const router = express.Router();

router.post('/signup', upload.single('file'), controller.signupDoctor);
router.post('/login', controller.loginDoctor);
router.get('/', controller.getDoctor);
router.get('/:id', controller.getDoctorById);

module.exports = router;
