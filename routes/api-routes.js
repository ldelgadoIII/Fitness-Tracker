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
  console.log(body)
  console.log(params.id)
  db.Workout.updateOne({ _id: params.id }, body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// POST - createWorkout
Router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
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