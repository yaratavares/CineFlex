import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

import LoadingPage from "../LoadingPage";

export default function FilmPage({ setPageControl }) {
  const [imageFilm, setImageFilm] = useState();

  useEffect(() => {
    const promisse = axios.get(
      "https://mock-api.driven.com.br/api/v4/cineflex/movies"
    );
    promisse.then((answer) => {
      setImageFilm(answer.data);
      setPageControl("/");
    });
  }, []);

  if (!imageFilm || imageFilm === undefined) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="filmPage">
        <div className="title">
          <p>Selecione o filme</p>
        </div>
        <div className="listFilms">
          {imageFilm.map((image) => (
            <Link to={`/sessoes/${image.id}`} key={image.id + "image"}>
              <div className="boxFilm">
                <div className="imageFilm">
                  <img src={image.posterURL} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
