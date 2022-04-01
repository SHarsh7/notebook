import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom'

function Notes() {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getnotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if(localStorage.getItem("auth-token")){
      getnotes();
    } else{
      navigate('/login');
    }
    
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const modalClose = useRef(null);
  const updateNote = currnote => {
    ref.current.click();
    setNote({
      id: currnote._id,
      etitle: currnote.title,
      edescription: currnote.description,
    });
  };

  const handleChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setNote({ id: "", etitle: "", edescription: "", etag: "" });
    modalClose.current.click();
  };

  return (
    <div className='row my-3'>
      <Addnote />

      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type='button'
        className='btn btn-primary d-none'
        data-toggle='modal'
        data-target='#exampleModal'>
        Launch demo modal
      </button>
      {/* 
<!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Modal title
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3 my-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    name='etitle'
                    className='form-control'
                    id='etitle'
                    aria-describedby='title'
                    onChange={handleChange}
                    value={note.etitle}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='c' className='form-label'>
                    Description
                  </label>
                  <textarea
                    name='edescription'
                    className='form-control'
                    id='edescription'
                    rows='3'
                    onChange={handleChange}
                    value={note.edescription}></textarea>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                ref={modalClose}
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                onClick={handleClick}
                className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3>Your notes</h3>
      {notes.map(note => {
        return <Noteitem note={note} updateNote={updateNote} key={note._id} />;
      })}
    </div>
  );
}

export default Notes;
