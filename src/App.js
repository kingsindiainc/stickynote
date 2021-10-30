import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddPost from "./components/AddNote";
import EditNote from "./components/EditNote";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <AddPost />} />
      <Route exact path="/edit/:id" component={() => <EditNote />} />
    </div>
  );
}

export default App;
