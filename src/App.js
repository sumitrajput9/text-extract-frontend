import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { ExtractedTextProvider } from "../src/context/ExtractedTextContext";

const App = () => {
  return (
    <ExtractedTextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ExtractedTextProvider>
  );
};

export default App;
