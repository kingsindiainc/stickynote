import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ notes, addNote }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkNoteExists = notes.filter((NOTE) =>
      NOTE.note === note ? NOTE : null
    );
    

    if (!note || !title) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkNoteExists.length > 0) {
      return toast.error("This Note already exists!!");
    }
    

    const data = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 0,
      note,
      title,
    };

    addNote(data);
    toast.success("Note added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Note</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Note"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state,
});
const mapDispatchToProps = (dispatch) => ({
  addNote: (data) => {
    dispatch({ type: "ADD_NOTE", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
