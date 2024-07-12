const express = require('express');
const controller = require('../controllers/user-controller');

const router = express.Router();

router.get('/', controller.getUser);
router.get('/:id', controller.getUserById);
router.post('/', controller.postUser);

module.exports = router;
