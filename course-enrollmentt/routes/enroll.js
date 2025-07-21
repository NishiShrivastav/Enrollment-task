const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Enroll in a course
router.post('/enroll', async (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: 'studentId and courseId are required' });
  }

  // Check if already enrolled
  const alreadyEnrolled = await Enrollment.findOne({ studentId, courseId });
  if (alreadyEnrolled) {
    return res.status(409).json({ message: 'Already enrolled in this course' });
  }

  // Create enrollment
  const newEnroll = new Enrollment({ studentId, courseId });
  await newEnroll.save();

  res.status(201).json({ message: 'Enrollment successful', data: newEnroll });
});

// Get enrolled courses
router.get('/my-courses/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const courses = await Enrollment.find({ studentId });
  res.status(200).json({ enrolledCourses: courses });
});

module.exports = router;