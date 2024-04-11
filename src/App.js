import React, { useState } from "react";
import "./App.css";
import List from "./List";
import { app } from "./firebase";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

const db = getDatabase(app);
let noteId = 0;

export default function App() {
  const [inputData, setinputData] = useState("");
  const [items, setItems] = useState([]);

  const itemEvent = (event) => {
    setinputData(event.target.value);
  };

  const putDataIntoDatabase = () => {
    set(ref(db, `Notes/Note ${noteId}`), {
      id: noteId,
      note: inputData,
    })
      .then(() => {
        console.log("Note added successfully !");
      })
      .catch((error) => {
        console.log(error);
      });

    // Another method of adding data into database that will generate sub folder automatically

    // const postListRef = ref(db, 'Notes');
    // const newPostRef = push(postListRef);
    // set(newPostRef,{
    //   id : noteId,
    //   Note : inputData
    // })

    noteId++;
  };

  const deleteDataFromDatabase = (id)=>{
    const dbref = ref(db);
    get(child(dbref,`Notes/Note ${noteId}`)).then(
      (snapshot)=>{
        if(snapshot.exists()){
          console.log(snapshot.val());
        }
        else{
          console.log("Data not found !");
        }
      }

    );
}

  const listOfItems = () => {
    if (inputData.length > 0) {
      setItems((oldItems) => {
        return [...oldItems, inputData];
      });

      putDataIntoDatabase();
    }

    setinputData("");
  };

  const deleteItems = (id) => {
    setItems((oldItems) => {
      return oldItems.filter((ele, idx) => {
        return idx !== id;
      });
    });

    deleteDataFromDatabase(id);
  };

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
            onClick={listOfItems}
          >
            ➕
          </button>
          <ol>
            {items.map((itemValue, index) => {
              return (
                <List
                  itemVal={itemValue}
                  key={index}
                  id={index}
                  onSelect={deleteItems}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
