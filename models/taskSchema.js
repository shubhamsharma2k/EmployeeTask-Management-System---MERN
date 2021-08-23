const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "empschema",
  },
  empName: {
    type: String,
  },
  taskName: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  taskColor: {
    type: String,
  },
});

module.exports = Task = mongoose.model("taskschema", TaskSchema);
