const departmentRouter = require('./department-router');
const hospitalRouter = require('./hospital-router');
const doctorRouter = require('./doctor-router');
const userRouter = require('./user-router');

const express = require('express');
const router = express.Router();

router.use('/department', departmentRouter);
router.use('/hospital', hospitalRouter);
router.use('/doctor', doctorRouter);
router.use('/user', userRouter);

module.exports = router;
