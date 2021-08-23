import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteResource } from "../../utils/dataFetching";

const DeleteResourcePopUp = ({ employees }) => {
  const [resource, setResource] = useState({
    empId: "",
  });

  const { empId } = resource;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (e) => {
    setResource({ ...resource, empId: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(empId);
    deleteResource({ empId });
  };

  return (
    <div>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{ position: "fixed" }}
      >
        Delete Resource
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Employee:</Form.Label>
              <Form.Control
                as="select"
                value={empId}
                onChange={(e) => handleSelect(e)}
              >
                <option>Select Employee</option>
                {employees.map((emp, index) => (
                  <option key={index} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
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
    </div>
  );
};

export default DeleteResourcePopUp;
