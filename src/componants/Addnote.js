import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

const Addnote = (props) => {
  const Context = useContext(noteContext);
  const { addNote } = Context;
  const [note, SetNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    SetNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };
  const onChange = (e) => {
    SetNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2>ADD NOTE</h2>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleAdd}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
