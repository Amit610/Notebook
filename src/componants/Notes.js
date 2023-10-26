import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const Context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = Context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    SetNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, SetNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleAdd = (e) => {
    editNote(note.id, note.edescription, note.etag, note.etitle);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    SetNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {" "}
        Edit Note{" "}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Note Editor
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <h2>EDIT NOTE</h2>
              <div className="container my-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h2>Your Note</h2>
        <div className="container">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              note={note}
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
