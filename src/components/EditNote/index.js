import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditNote = ({ notes, updateNote }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentNote = notes.find(
    (NOTE) => NOTE.id === parseInt(id)
  );

  useEffect(() => {
    setTitle(currentNote.title);
    setNote(currentNote.note);
  }, [currentNote]);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkNoteExists = notes.filter((NOTE) =>
      NOTE.title === title && NOTE.id !== currentNote.id
        ? NOTE
        : null
    );
    

    if (!title || !note ) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkNoteExists.length > 0) {
      return toast.error("This Title already exists!!");
    }
    

    const data = {
      id: currentNote.id,
      note,
      title,
    };

    updateNote(data);
    toast.success("Note updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-5 my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentNote ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={title}
                  placeholder={"Title"}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={note}
                  placeholder={"Note"}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Note
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Note Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateNote: (data) => {
    dispatch({ type: "UPDATE_NOTE", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
