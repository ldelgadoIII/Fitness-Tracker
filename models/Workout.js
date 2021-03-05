const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now
    },
    exercises: Array
});

WorkoutSchema.methods.setDate = function() {
  this.setDate = Date.now();
  return this.setDate;
};

WorkoutSchema.methods.getDate = function() {
  this.getDate = this.day;
  return this.getDate;
};

const Workout = mongoose.Model("Workout", WorkoutSchema);

module.exports = Workout;