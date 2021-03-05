const Router = require("express").Router();
const db = require("../models");

// GET all workouts
Router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,
      }
    },
    {
      $addFields: { totalScore:
        { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
    }
 ])
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// // POST - addExercise
// app.post("/api/workouts", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(dbWorkout => res.json(dbWorkout))
//     .catch(err => {
//       res.json(err);
//     })
// });

// // GET - getWorkoutsInRange
// app.get("/api/workouts/range", ({ body }, res) => {
//   db.Workout.insert(body)
//     .then(dbWorkout => res.json(dbWorkout))
//     .catch(err => {
//       res.json(err);
//     })
// });

// // PUT - addEx
// app.put("/api/workouts/:id", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(dbWorkout => res.json(dbWorkout))
//     .catch(err => {
//       res.json(err);
//     })
// });

module.exports = Router;