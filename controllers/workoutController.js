const Workout = require('../models/workoutModel')
//Imported mongoose to check if id is mongoose it or not
const mongoose = require('mongoose')

//Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  try {
    const workout = await Workout.find({ user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//Get a single workout
//to find single workout by id need to use if statement
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

//Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  //Empty fields check
  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields })
  }
  //add docs to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//delete  workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

//update a workout

// function below can be written like this and work as it should

//const updateWorkout = async (req, res) => {
//  const { id } = req.params
//
//  if (!mongoose.Types.ObjectId.isValid(id)) {
//    return res.status(404).json({ error: 'No such workout' })
//  }
//
//  const workout = await Workout.findById(id)
//  const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
//    new: true,
//  })
//  res.status(200).json(updatedWorkout)
//}

const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
}
