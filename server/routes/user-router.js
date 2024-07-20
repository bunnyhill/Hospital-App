const express = require('express');
const controller = require('../controllers/user-controller');

const router = express.Router();

router.post('/sign-up', controller.signupUser);
router.post('/login', controller.loginUser);
router.post('/forgot-password', controller.forgetPasswordUser);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/:id', controller.getUserById);

module.exports = router;
