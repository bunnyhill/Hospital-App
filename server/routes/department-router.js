const express = require('express');
const controller = require('../controllers/department-controller.js');
const upload = require('../middlewares/imageUpload.js');

const router = express.Router();

router.get('/', controller.getDepartment);
router.get('/:id', controller.getDepartmentById);
router.post('/', upload.single('file'), controller.postDepartment);

router.get('/pdf/:id', controller.pdf);

module.exports = router;
