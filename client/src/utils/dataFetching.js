import axios from "axios";

//Add new Employee
export const newResource = async ({ id, empName }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id, empName });

  try {
    const res = await axios.post("/api/newEmployee", body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get All Employees
export const getEmps = async () => {
  try {
    const res = await axios.get("/api/getEmployees");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get Employees by name
export const getEmpByName = async (empName) => {
  try {
    const res = await axios.get(`/api/getEmployee/${empName}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Delete Employee
export const deleteResource = async ({ empId }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(
      "/api/deleteEmployee",
      { data: { empId } },
      config
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Add New Task
export const newTask = async ({ empName, taskName, date, time, taskColor }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ empName, taskName, date, time, taskColor });

  try {
    const res = await axios.post("/api/newTask", body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get All Tasks
export const getAllTasks = async () => {
  try {
    const res = await axios.get("/api/getAllTasks");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get Task By task _id
export const getTaskById = async ({ id }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id });
  try {
    const res = await axios.get("/api/getTaskById", body, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Update Task By task _id
export const updateTaskById = async ({
  id,
  taskName,
  date,
  time,
  taskColor,
}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id, taskName, date, time, taskColor });

  try {
    const res = await axios.put("/api/updateTask", body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
