import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateTaskById } from "../../../utils/dataFetching";

const EditTaskPopup = ({ taskID }) => {
  const [tasks, setTasks] = useState({
    taskName: "",
    date: "",
    time: "",
    taskColor: "",
    id: taskID,
  });

  const { taskName, date, time, taskColor, id } = tasks;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const HandleTask = (e) => {
    setTasks({ ...tasks, taskName: e.target.value });
  };

  const HandleDate = (e) => {
    setTasks({ ...tasks, date: e.target.value });
  };

  const HandleTime = (e) => {
    setTasks({ ...tasks, time: e.target.value });
  };

  const handleTaskType = (e) => {
    setTasks({ ...tasks, taskColor: e.target.value });
  };

  const handleSubmit = (e) => {
    updateTaskById({ id, taskName, date, time, taskColor });
  };

  return (
    <React.Fragment>
      <a className="link" onClick={handleShow}>
        Edit
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Task to be assigned:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                onChange={(e) => HandleTask(e)}
                value={taskName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  HandleDate(e);
                }}
                value={date}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Time:</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => {
                  HandleTime(e);
                }}
                value={time}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status:</Form.Label>
              <Form.Control
                as="select"
                value={taskColor}
                onChange={(e) => handleTaskType(e)}
              >
                <option value="none">None</option>
                <option value="#FFE4B2">Weekend</option>
                <option value="#ffffcc">Tentative Project</option>
                <option value="#B2D8B2">Confirmed Project</option>
                <option value="pink">leave</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditTaskPopup;
