import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ notes, deleteNotes }) => {
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 col-1">
          Add Note
        </Link>
        <div className="col-md-4 mx-auto my-5">
            
              {notes.length > 0 ? (
                notes.map((notes, id) => (
                    <div className="card m-3">
                    <div className="card-header">
                        {notes.title}
                    </div>
                    <div className="card-body">
                        <p class="card-text">{notes.note}</p>
                        <Link
                        to={`/edit/${notes.id}`}
                        className="btn btn-sm btn-dark"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteNotes(notes.id)}
                        className="btn btn-sm btn-danger ms-5"
                      >
                        Delete
                      </button>
                    </div>
                    
                  </div>
                  
                ))
              ) : (
                <tr>
                  <th>No Note Found</th>
                </tr>
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
  deleteNotes: (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
