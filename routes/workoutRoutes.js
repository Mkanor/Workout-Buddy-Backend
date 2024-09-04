const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
const {CreateWorkout,GetWorkout,GetWorkouts,UpdateWorkout,DeleteWorkout} = require('../controllers/workoutController');

router.use(requireAuth);
router.get('/',GetWorkouts)
router.get('/:id',GetWorkout)

router.post('/',CreateWorkout)

router.patch('/:id',UpdateWorkout)
router.delete('/:id',DeleteWorkout)

module.exports = router;