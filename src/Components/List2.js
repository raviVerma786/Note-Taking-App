import React from "react";

export const List2 = (props) => {
  return (
    <div className="card-deck">
      <div id="cardShadow" className="card">
        <div className="card-body">
          <p className="card-text">{props.noteVal}</p>
        </div>
        <div className="operations center">
          <button
            type="button"
            id="deleteButton"
            className="btn btn-primary m-2 py-0"
            onClick={() => {
              return props.onSelect(props.id);
            }}
          >
            Delete
          </button>
          <button
            id="updateButton"
            type="button"
            className="btn btn-secondary m-2 py-0"
          >
            Update
          </button>
        </div>
        <div className="card-footer">
          <small className="text-muted">{`Last updated on ${props.date} at ${props.time}`}</small>
        </div>
      </div>
    </div>
  );
};
