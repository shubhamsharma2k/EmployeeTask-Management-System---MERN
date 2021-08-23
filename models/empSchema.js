const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  empName: {
    type: String,
    required: true,
  },
  empPassword: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  allTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taskschema",
    },
  ],
});

module.exports = Emp = mongoose.model("empschema", EmployeeSchema);
