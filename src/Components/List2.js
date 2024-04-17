import React, { useState } from "react";
// import UpdateModal from "./Modal/UpdateModal";
import { Button } from "react-bootstrap";
import DeleteBootstrapModal from "./Modal/DeleteBootstrapModal";
import UpdateBootrapModal from "./Modal/UpdateBootrapModal";

export const List2 = (props) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
        <UpdateBootrapModal
          show={updating}
          notedata = {props.noteVal}
          onHide={() => setUpdating(false)}
          id={props.id}
        />

     <DeleteBootstrapModal show={deleting} onHide={() => setDeleting(false)} id={props.id} />

      <div className="card-deck listCard">
        <div id="cardShadow" className="card">
          <div className="card-body">
            <p className="card-text">{props.noteVal}</p>
          </div>
          <div className="operations center">
            {/* <button
              type="button"
              id="deleteButton"
              className="btn btn-primary m-2 py-0"
              onClick={() => setDeleting(true)}
            >
              Delete
            </button> */}
            <Button variant="danger" className="py-0" onClick={() => setDeleting(true)}>
              Delete
            </Button>

            <button
              id="updateButton"
              type="button"
              className="btn btn-secondary m-2 py-0"
              onClick={() => setUpdating(true)}
            >
              Update
            </button>
          </div>
          <div className="card-footer">
            <small className="text-muted">{`Last updated on ${props.date} at ${props.time}`}</small>
          </div>
        </div>
      </div>
    </>
  );
};
