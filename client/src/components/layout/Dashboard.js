import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./TasksColumn";
import ResourceColumn from "./ResourceColumn";
import NewResourcePopup from "./popups/NewResourcePopup";
import EmployeeItem from "./EmployeeItem";
import date from "date-and-time";
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

  let list = [];
  let now = new Date(2021, 7);
  const companyShedule = 100;
  for (let i = 0; i <= companyShedule; i++) {
    var ans = date.addDays(now, i).toString();
    list.push(ans);
  }

  const handleButton = async (e) => {
    const buttonVal = e.target.value;
    const res = await getEmpByName(buttonVal);
    setSingleEmp(res);
    setClicked(true);
  };

  return (
    <div>
      <div className="d-flex mt-3 justify-content-evenly align-items-center">
        <div>
          <NewResourcePopup />
        </div>
      </div>

      {clicked === true && (
        <a href="/" style={{ color: "black" }}>
          <i class="fas fa-long-arrow-alt-left fa-2x"></i>
        </a>
      )}

      <div className="row mt-4">
        {/* RESOURCES COLUMN */}

        <div className="col-xl-3 shadow-lg bg-white rounded resources">
          <ResourceColumn
            employees={employees}
            clicked={clicked}
            searchEmp={searchEmp}
            singleEmp={singleEmp}
            setSearchEmp={setSearchEmp}
            handleButton={handleButton}
          />
        </div>

        {/* TASKS COLUMN */}

        <div className=" overflow-auto col-xl-9 tasks-container">
          {clicked === true ? (
            <EmployeeItem employee={singleEmp} employees={employees} />
          ) : (
            <Tasks employees={employees} list={list} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <div
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
      </div> */
}
