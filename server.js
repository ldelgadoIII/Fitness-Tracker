const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

const db = require("./models");

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// loggin middleware
app.use(logger("dev"));

// post request middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// static folder
app.use(express.static("public"));

// ROUTES
// Find all workouts
app.get("/api/workouts", (req, res) => {
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

// GET - getWorkoutsInRange
app.get("/api/workouts/range", ({ body }, res) => {
  db.Workout.insert(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// POST - addExercise
app.post("/api/workouts/", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

// PUT - createWorkout
app.put("/api/workouts/:id", ({ body }, res) => {
  db.Workout.insert(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
      res.json(err);
    })
});

app.listen(PORT, () => {
    console.log(`You're running on port ${PORT}`);
})