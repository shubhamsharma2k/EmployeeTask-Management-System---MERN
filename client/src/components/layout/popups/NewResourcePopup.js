import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { newResource } from "../../../utils/dataFetching";

const NewResourcePopup = () => {
  const [resource, setResource] = useState({
    id: "",
    empName: "",
  });
  const { id, empName } = resource;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const HandleName = (e) => {
    setResource({ ...resource, empName: e.target.value });
  };

  const HandleId = (e) => {
    setResource({ ...resource, id: e.target.value });
  };

  const handleSubmit = (e) => {
    newResource({ id, empName });
  };

  return (
    <React.Fragment>
      <a variant="primary" className="btn btn-primary" onClick={handleShow}>
        New Resource
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Enter Id:</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Enter new Id"
                onChange={(e) => HandleId(e)}
                value={id}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Enter New Resource Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name of the resource"
                onChange={(e) => HandleName(e)}
                value={empName}
              />
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

export default NewResourcePopup;
