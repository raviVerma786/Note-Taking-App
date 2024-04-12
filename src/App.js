import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import { app } from "./firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  onValue,
} from "firebase/database";

const db = getDatabase(app);
let noteId = 0;

export default function App() {
  const [inputData, setinputData] = useState("");
  const [notesData, setNotesData] = useState(null);

  useEffect(() => {
    const dbref = ref(db, "Notes");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      // console.log(typeof data);
      // console.log(data);
      setNotesData(data);
    });
  }, [setNotesData]);

  const itemEvent = (event) => {
    setinputData(event.target.value);
  };

  const putDataIntoDatabase = () => {
    set(ref(db, "Notes/" + noteId), {
      id: noteId,
      note: inputData,
    })
      .then(() => {
        console.log("Note added successfully !");
      })
      .catch((error) => {
        console.log(error);
      });
    
      setinputData("");
    noteId++;
  };

  const deleteDataFromDatabase = () => {
    console.log("Data deleted from database");
  };
  

  // Before firebase and using only usestate
  // const listOfItems = () => {
  //   if (inputData.length > 0) {
  //     setItems((oldItems) => {
  //       return [...oldItems, inputData];
  //     });

  //   }

  //   setinputData("");
  // };

  // const deleteItems = (id) => {
  //   setItems((oldItems) => {
  //     return oldItems.filter((ele, idx) => {
  //       return idx !== id;
  //     });
  //   });

  //   deleteDataFromDatabase(id);
  // };

  return (
    <>
      <div className="mainDiv">
        <div className="centerDiv">
          <br />
          <h1>Note Taking App</h1>
          <br />
          <input
            type="text"
            placeholder="Create New Note"
            onChange={itemEvent}
            value={inputData}
          />

          <button
            className="btn btn-secondary mx-2 rounded-pill"
            onClick={putDataIntoDatabase}
          >
            ➕
          </button>
          <ol>
            {notesData && (
              <div className="todo_style">
                {Object.entries(notesData).map(([key, value]) => {
                  return (
                    <List
                      itemVal={value.note}
                      key={key}
                      onSelect={deleteDataFromDatabase}
                    />
                  );
                })}
              </div>
            )}

          </ol>
        </div>
      </div>
    </>
  );
}
