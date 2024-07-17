const departmentRouter = require('./department-router');
const hospitalRouter = require('./hospital-router');
const doctorRouter = require('./doctor-router');
const userRouter = require('./user-router');
const appointmentRouter = require('./appointment-router');
const slotRouter = require('./slot-router');
const prescriptionRouter = require('./prescription-router');

const express = require('express');
const router = express.Router();

router.use('/departments', departmentRouter);
router.use('/hospitals', hospitalRouter);
router.use('/doctors', doctorRouter);
router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);
router.use('/slots', slotRouter);
router.use('/prescriptions', prescriptionRouter);

module.exports = router;
