import "../../css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FilmPage from "../FilmPage";
import SessionPage from "../SessionPage";
import HeaderPage from "../HeaderPage";

export default function CineFlex() {
  return (
    <div className="container">
      <HeaderPage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilmPage />}></Route>
          <Route path="/sessoes/:idFilme" element={<SessionPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
