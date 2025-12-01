import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import { Produto } from "./Pages/Produto/Produto";
import { Estoque } from "./Pages/Estoque/Estoque";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produto />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </>
  );
}

export default App;
