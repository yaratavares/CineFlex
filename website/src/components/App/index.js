import "../../css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import FilmPage from "../FilmPage";
import SessionPage from "../SessionPage";
import HeaderPage from "../HeaderPage";
import SeatPage from "../SeatPage";
import SucessPage from "../SucessPage";

export default function App() {
  const [requestObject, setRequestObject] = useState({});
  const [pageControl, setPageControl] = useState();

  return (
    <div className="container">
      <BrowserRouter>
        <HeaderPage pageControl={pageControl} />
        <Routes>
          <Route
            path="/"
            element={<FilmPage setPageControl={setPageControl} />}
          ></Route>
          <Route
            path="/sessoes/:idFilme"
            element={<SessionPage setPageControl={setPageControl} />}
          ></Route>
          <Route
            path="/assentos/:idSessao"
            element={
              <SeatPage request={requestObject} setRequest={setRequestObject} />
            }
          ></Route>
          <Route
            path="/sucesso"
            element={<SucessPage page="sucesso" request={requestObject} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
