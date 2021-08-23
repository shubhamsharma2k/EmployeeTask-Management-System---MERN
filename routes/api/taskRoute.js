const express = require("express");
const router = express.Router();
const Emp = require("../../models/empSchema");
const Task = require("../../models/taskSchema");
const mongoose = require("mongoose");

//@POST   Post New Task
router.post("/newTask", async (req, res) => {
  const { empName } = req.body;

  try {
    const emp = await Emp.findOne({ empName });

    if (!emp) {
      return res.status(500).json({ msg: "Employee doesnt exist" });
    }

    let newTask = new Task({
      taskName: req.body.taskName,
      date: req.body.date,
      time: req.body.time,
      taskColor: req.body.taskColor,
      employee: emp._id,
    });

    await newTask.save();

    emp.allTasks.push(newTask);
    await emp.save();
    return res.json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

//@GET   Get all Tasks
router.get("/getAllTasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

//@GET   Get Task By task _id
router.get("/getTaskById", async (req, res) => {
  try {
    const tasks = await Task.findOne({ _id: req.body.id });
    return res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

//@PUT  Update Task by task _id
router.put("/updateTask", async (req, res) => {
  const { id, taskName, date, time, taskColor } = req.body;

  let taskFields = { id, taskName, date, time, taskColor };

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: taskFields },
      { new: true }
    );

    return res.json(task);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
