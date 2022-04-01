import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tags);
    }
    const handleChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }
  return (
    <div className="container my-3">
      <h3>Add a note</h3>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="c" className="form-label">
            Description
          </label>
          <textarea
           name="description"
            className="form-control"
            id="description"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addnote;
