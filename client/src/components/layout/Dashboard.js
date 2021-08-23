import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import NewTaskPopup from "./NewTaskPopup";
import NewResourcePopup from "./NewResourcePopup";
import EmployeeItem from "./EmployeeItem";
import { getEmpByName } from "../../utils/dataFetching";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [singleEmp, setSingleEmp] = useState({});
  const [clicked, setClicked] = useState(false);
  const [searchEmp, setSearchEmp] = useState("");

  useEffect(async () => {
    const res = await axios.get("/api/getEmployees");
    setEmployees(res.data);
  }, []);

  const handleButton = async (e) => {
    const buttonVal = e.target.value;
    const res = await getEmpByName(buttonVal);
    setSingleEmp(res);
    setClicked(true);
  };

  return (
    <div>
      {/* <div
        className="legend d-flex flex-column mx-4 my-4 "
        style={{ width: "200px" }}
      >
        <h6 style={{ border: "1px solid black" }}>None</h6>
        <h6 style={{ backgroundColor: "#FFE4B2", border: "1px solid black" }}>
          Weekend
        </h6>
        <h6 style={{ backgroundColor: "#ffffcc", border: "1px solid black" }}>
          Tentative Project
        </h6>
        <h6 style={{ backgroundColor: "#B2D8B2", border: "1px solid black" }}>
          Confirmed Project
        </h6>
        <h6 style={{ backgroundColor: "pink", border: "1px solid black" }}>
          Leave
        </h6>
      </div> */}
      <div>
        <NewResourcePopup />
      </div>
      <div>
        <NewTaskPopup employees={employees} />
      </div>

      <div className="row">
        {/* RESOURCES COLUMN */}
        <div className="col-xl-3 shadow-lg bg-white rounded resources">
          <table className="table table-borderless">
            <thead
              style={{ backgroundColor: "#A40C77" }}
              className="text-light"
            >
              <tr>
                <th className="th-id">Id</th>

                {/* DROPDOWN MENU IN RESOURCES */}
                <th className="th-resources dropdown">
                  <a
                    className="dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ textDecoration: "none" }}
                  >
                    Resource
                  </a>
                  <ul
                    className="dropdown-menu drp-down text-light"
                    style={{ width: "250px" }}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li style={{ padding: "0px 20px" }}>
                      <input
                        placeholder="Search Employee"
                        className="form-control"
                        onChange={(e) => setSearchEmp(e.target.value)}
                      />
                    </li>

                    {employees
                      .filter((empName) => {
                        if (searchEmp === "") {
                          return empName;
                        } else if (
                          empName.empName.includes(searchEmp) ||
                          empName.empName.toLowerCase().includes(searchEmp)
                        ) {
                          return empName;
                        }
                      })
                      .map((empName, index) => (
                        <li key={index}>
                          <button
                            className="dropdown-item text-center"
                            value={empName.empName}
                            name={empName.empName}
                            onClick={(e) => handleButton(e)}
                          >
                            {empName.empName}
                          </button>
                        </li>
                      ))}
                  </ul>
                </th>
              </tr>
            </thead>

            <tbody>
              {/* ALL EMPLOYEES AND SELECTED EMPLOYEE FILTER */}
              {searchEmp !== "" && clicked == true ? (
                <tr>
                  <td style={{ padding: "10px" }} className="text-center">
                    {singleEmp.id}
                  </td>
                  <td
                    style={{
                      height: "100px",
                    }}
                    className="text-center"
                  >
                    {singleEmp.empName}
                  </td>
                </tr>
              ) : (
                employees.map((empName, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px" }} className="text-center">
                      {empName.id}
                    </td>
                    <td
                      style={{
                        height: "100px",
                      }}
                      className="text-center"
                    >
                      {empName.empName}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* TASKS COLUMN */}
        <div className=" overflow-auto col-xl-9 tasks-container">
          {/* ALL TASKS AND SELECTED EMPLOYEE'S TASKS FILTER */}
          {(clicked === true && searchEmp !== "") ||
          (clicked === true && searchEmp === "") ? (
            <EmployeeItem employee={singleEmp} employees={employees} />
          ) : (
            <Tasks
              employees={employees}
              searchEmp={searchEmp}
              clicked={clicked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
