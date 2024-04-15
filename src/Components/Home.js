import React, { useEffect, useState } from "react";
import "../App.css";
// import List from "./List";
import { List2 } from "./List2";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "firebase/database";

const db = getDatabase(app);
let noteId = 0;

export default function Home() {
  const [inputData, setinputData] = useState("");
  const [notesData, setNotesData] = useState(null);

  useEffect(() => {
    const dbref = ref(db, "Notes");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setNotesData(data);

      if (data) {
        const allKeys = Object.keys(data);
        noteId = Number(allKeys[allKeys.length - 1]) + 1;
      }
    });
  }, []);

  const handleInputNoteChange = (event) => {
    setinputData(event.target.value);
  };

  const putDataIntoDatabase = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();

    const dt = `${dd}/${mm}/${yy}`;
    const t = `${hh}:${min}`;

    set(ref(db, "Notes/" + noteId), {
      id: noteId,
      note: inputData,
      date: dt,
      time: t,
    })
      .then(() => {
        console.log("Note added successfully !");
      })
      .catch((error) => {
        console.log(error);
      });

    setinputData("");
  };

  // const deleteDataFromDatabase = (key) => {
  //   const dbNoteRef = ref(db, "Notes/" + key);

  //   // ReactDOM.render()
  //   if (window.confirm("Are you sure ?") === true) {
  //     remove(dbNoteRef);
  //   }
  // };

  // const updateDataFromDatabase = (key, noteValue) => {
  //   setUpdating(true);
  // };

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
        {/* {userSignedIn && <h1>Welcome To NoteTaking Web App!</h1>} */}
          <br />
          <input
            type="text"
            placeholder="Create New Note"
            onChange={handleInputNoteChange}
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
                    <List2
                      noteVal={value.note}
                      key={key}
                      id={key}
                      date={value.date}
                      time={value.time}
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
