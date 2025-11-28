import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import { Produto } from "./Pages/Produto/Produto";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produto />} />
      </Routes>
    </>
  );
}

export default App;
