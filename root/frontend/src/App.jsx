import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import Login from "./Routes/Login";
import About from "./Components/header&banner/about";
import Dashboard from "./Routes/Dashboard";
import Payments from "./Routes/Payments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payments" element={<Payments />} />
    </Routes>
  );
}

export default App;
