import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WordbaseForm from "./WordbaseForm";
import Anagrams from "./Anagrams";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="wordbaseForm" element={<WordbaseForm/>}/>
        <Route path="/" element={<Anagrams/>}/>
      </Routes>
    </Router>
  );
}

export default App;
