import "../../css/reset.css";

import HeaderPage from "../HeaderPage";
import FilmPage from "../FilmPage";
import SessionPage from "../SessionPage";

export default function CineFlex() {
  return (
    <div className="container">
      <HeaderPage />
      <FilmPage />
    </div>
  );
}
