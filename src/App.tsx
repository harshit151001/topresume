import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import ShortlistedCandidates from "./routes/shortlistedCandidates";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shortlisted-candidates"
          element={<ShortlistedCandidates />}
        />
      </Routes>
    </Router>
  );
};

export default App;
