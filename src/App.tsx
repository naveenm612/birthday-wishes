import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BirthdayCardForm from "./components/BirthdayCardForm/BirthdayCardForm";
import BirthdayCardPreview from "./components/BirthdayCardPreview/BirthdayCardPreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayCardForm />} />
        <Route path="/preview" element={<BirthdayCardPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
