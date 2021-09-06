import React from "react";
import NewTaskPopup from "./popups/NewTaskPopup";

const ResourceColumn = ({
  employees,
  clicked,
  searchEmp,
  singleEmp,
  setSearchEmp,
  handleButton,
}) => {
  return (
    <React.Fragment>
      <table className="table table-borderless">
        <thead style={{ backgroundColor: "#A40C77" }} className="text-light">
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
          {clicked === true ? (
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
                  <div>
                    <NewTaskPopup employees={employees} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ResourceColumn;
