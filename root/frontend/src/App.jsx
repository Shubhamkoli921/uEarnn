import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import Signin from "./Routes/Signin";
import About from "./Components/header&banner/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
