import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AddItemModal({...props}) {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { props.children }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  )
};

export default AddItemModal;