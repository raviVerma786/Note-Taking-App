import React, { useEffect, useState,useContext } from "react";
import "../App.css";
import { List2 } from "./List2";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "firebase/database";

import { UserContext } from "../Context/UserCredentials";
import { useNavigate } from "react-router-dom";

const db = getDatabase(app);
let noteId = 0;
export default function Home() {
  const [inputData, setinputData] = useState("");
  const [notesData, setNotesData] = useState(null);
  const navigate = useNavigate();
  const userDetails = useContext(UserContext);

  useEffect(() => {
    const dbref = ref(db, `${userDetails.user}/Notes`);
    const token = localStorage.getItem('token');

    if(token){
      userDetails.setSignedIn(true);
      userDetails.setUser(localStorage.getItem('userId'));
    }
    else{
      userDetails.setSignedIn(false);
      navigate('/login');
    }
    
    
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setNotesData(data);
      
      if (data) {
        const allKeys = Object.keys(data);
        noteId = Number(allKeys[allKeys.length - 1]) + 1;
      }
    });
  }, [navigate,userDetails]);

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
    
    set(ref(db, `${userDetails.user}/Notes/` + noteId), {
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

  return userDetails.signedIn && <>
      <div className="mainDiv">
        <div className="centerDiv">
          <br />
        {userDetails.signedIn && <h2>Welcome To NoteTaking App</h2>}
          <br />
          <input
            type="text"
            placeholder="Create New Note"
            onChange={handleInputNoteChange}
            value={inputData}
          />

          <button
            className="btn btn-success mx-2 rounded-pill"
            onClick={putDataIntoDatabase}
          >
            ➕
          </button>
          <ol className="mt-5">
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
  ;
}
