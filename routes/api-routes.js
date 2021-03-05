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

// PUT - addEx
// app.put("/api/workouts/:id", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(dbWorkout => res.json(dbWorkout))
//     .catch(err => {
//       res.json(err);
//     })
// });

// POST - createWorkout
// app.post("/api/workouts", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(dbWorkout => res.json(dbWorkout))
//     .catch(err => {
//       res.json(err);
//     })
// });

// GET - getWorkoutsInRange
Router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,
        totalWeight: { $sum: "$exercises.weight" }
      }
    }
 ])
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

module.exports = Router;