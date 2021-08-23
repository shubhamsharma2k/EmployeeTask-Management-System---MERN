const express = require("express");
const router = express.Router();
const Emp = require("../../models/empSchema");
const Task = require("../../models/taskSchema");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

//@GET   Get all Employees and populate all Tasks
router.get("/getEmployees", async (req, res) => {
  try {
    const emps = await Emp.find().populate("allTasks");
    return res.json(emps);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

//@GET /api/getEmployee/:name
router.get("/getEmployee/:empName", async (req, res) => {
  try {
    const employee = await Emp.findOne({
      empName: req.params.empName,
    }).populate("allTasks");
    res.json(employee);
  } catch (error) {
    console.log(error);
  }
});

//@POST   Add New Employee
router.post("/newEmployee", async (req, res) => {
  const { empName, id } = req.body;

  try {
    let newEmployee = await Emp.findOne({ id });

    if (newEmployee) {
      return res.status(500).json({ msg: "Employee exists" });
    }

    newEmployee = new Emp({
      empName,
      id,
    });

    await newEmployee.save();

    return res.json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

//@POST   Add New User
router.post("/registerAdmin", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, id, email, password } = req.body;

  try {
    let newEmployee = await Emp.findOne({ email });

    if (newEmployee) {
      return res.status(500).json({ msg: "Admin user exists" });
    }

    newEmployee = new Emp({
      name,
      id,
    });

    await newEmployee.save();

    return res.json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

//@DELETE /api/getEmployeeById
router.delete("/deleteEmployee", async (req, res) => {
  const { empId } = req.body;

  try {
    await Emp.findOneAndRemove({ _id: empId });

    await Task.deleteMany({ employee: empId });

    res.json({ msg: "User Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
