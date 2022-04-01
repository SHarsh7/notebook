import React,{useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem( props ) {
   
    
    const context = useContext(noteContext);
    const {deleteNote,getnotes} = context;
    const{note,updateNote}=props;
    useEffect(() => {
      getnotes();
    }, [note])
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <button type="button" className="btn btn-danger mx-2" onClick={()=>{deleteNote(note._id)}}>Delete</button>
          <button type="button" className="btn btn-secondary mx-2" onClick={()=>{
            updateNote(note)
          }}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
