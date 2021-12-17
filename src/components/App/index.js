import "../../css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";

import FilmPage from "../FilmPage";
import SessionPage from "../SessionPage";
import HeaderPage from "../HeaderPage";
import SeatPage from "../SeatPage";
import SucessPage from "../SucessPage";

export default function App() {
  const [requestObject, setRequestObject] = useState({});

  return (
    <div className="container">
      <HeaderPage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilmPage />}></Route>
          <Route path="/sessoes/:idFilme" element={<SessionPage />}></Route>
          <Route
            path="/assentos/:idSessao"
            element={
              <SeatPage request={requestObject} setRequest={setRequestObject} />
            }
          ></Route>
          <Route
            path="/sucesso"
            element={<SucessPage request={requestObject} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
