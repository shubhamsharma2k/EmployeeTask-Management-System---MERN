import React from "react";
import Moment from "react-moment";
import EditTaskPopup from "./EditTaskPopup";
import date from "date-and-time";

const EmployeeItem = ({ employee, employees }) => {
  const list = [];
  const now = new Date(2021, 7);
  const companyShedule = 100;
  for (let i = 0; i <= companyShedule; i++) {
    var ans = date.addDays(now, i).toString();
    list.push(ans);
  }
  return (
    <div>
      <table className="table table-borderless">
        <thead style={{ backgroundColor: "#A40C77" }} className="text-light">
          <tr>
            {list.map((date, index) => (
              <th key={index} className="th-date">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {employee.allTasks.map((task, index) => (
              <td
                key={index}
                style={{
                  border: "1px solid grey",
                  borderRadius: "20px",
                  backgroundColor: `${task.taskColor}`,
                }}
              >
                {task.taskName}
                <div>
                  <EditTaskPopup employees={employees} taskID={task._id} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeItem;
