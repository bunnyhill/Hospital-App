const departmentRouter = require('./department-router');
const hospitalRouter = require('./hospital-router');

const express = require('express');
const router = express.Router();

router.use('/department', departmentRouter);
router.use('/hospital', hospitalRouter);

module.exports = router;
