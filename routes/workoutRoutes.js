const express = require('express')
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//const Workout = require('../models/workoutModel') moved to workout controller
const router = express.Router()

//require auth for auth workout routes
router.use(requireAuth)

//Get all workouts
router.get('/', getWorkouts)

//Get single workout
router.get('/:id', getWorkout)

router.post('/', createWorkout)
// All requests moved to workout controller and change just ot router.post()
//Post a new workout
//router.post('/', async (req, res) => {
//  const { title, load, reps } = req.body
//  try {
//    const workout = await Workout.create({ title, load, reps })
//    res.status(200).json(workout)
//  } catch (error) {
//    res.status(400).json({ error: error.message })
//  }
//})

//above code can be written in this format too still works as it should
//router.post('/', async (req, res) => {
//  const { title, load, reps } = req.body
//  if (!title || !load || !reps) {
//    res.status(400).json({ error: error.message })
//  } else {
//    const workout = await Workout.create({ title, load, reps })
//    res.status(200).json(workout)
//  }
//})

//Delete a workout
router.delete('/:id', deleteWorkout)

//Update a workout
router.patch('/:id', updateWorkout)

module.exports = router
