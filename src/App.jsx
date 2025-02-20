import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./TaskList";
import Cart from "./Cart";
import GuessGame from "./GuessGame";
import NavBar from "./NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/guess-game" element={<GuessGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
