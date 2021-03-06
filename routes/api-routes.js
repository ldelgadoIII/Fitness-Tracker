const Router = require("express").Router();
const db = require("../models");

// GET all workouts
Router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,
      }
    }
 ])
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// PUT - addExcercise
Router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true})
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// POST - createWorkout
Router.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// GET - getWorkoutsInRange
Router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,
        totalWeight: { $sum: "$exercises.weight" }
      }
    },
    {
      $limit: 7
    }
 ])
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

module.exports = Router;