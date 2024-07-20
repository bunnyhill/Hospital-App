const departmentRouter = require('./department-router');
const hospitalRouter = require('./hospital-router');
const doctorRouter = require('./doctor-router');
const doctorsRouter = require('./doctors-router');
const userRouter = require('./user-router');
const usersRouter = require('./users-router');
const appointmentRouter = require('./appointment-router');
const slotRouter = require('./slot-router');
const prescriptionRouter = require('./prescription-router');

const express = require('express');
const router = express.Router();

router.use('/department', departmentRouter);
router.use('/hospital', hospitalRouter);

router.use('/doctor', doctorRouter);
router.use('/doctors', doctorsRouter);

router.use('/user', userRouter);
router.use('/users', usersRouter);

router.use('/appointment', appointmentRouter);
router.use('/slot', slotRouter);
router.use('/prescription', prescriptionRouter);

module.exports = router;
