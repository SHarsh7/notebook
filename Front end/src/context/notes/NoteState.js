import { useState } from "react";
import NoteContext from "./noteContext";

const host = "http://localhost:5000";
function NoteState(props) {
  const [notes, setNotes] = useState([]);

  //fetch all notes

  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };
  //Delete note
  const deleteNote = async id => {
    //API call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("auth-token"),
      },
    });
    await response.json();

    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
    const newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
