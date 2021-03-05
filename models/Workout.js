const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
    },
  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
});

// WorkoutSchema.methods.setDate = function() {
//   this.setDate = Date.now();
//   return this.setDate;
// };

// WorkoutSchema.methods.getDate = function() {
//   this.getDate = this.day;
//   return this.getDate;
// };

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;