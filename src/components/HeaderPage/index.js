import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeaderPage({ pageControl }) {
  let navigate = useNavigate();

  function returnClick() {
    const test = navigate(-1);
  }

  return (
    <header>
      {pageControl !== "/" && pageControl !== undefined ? (
        <button onClick={returnClick}>voltar</button>
      ) : (
        ""
      )}

      <h1>CINEFLEX</h1>
    </header>
  );
}
