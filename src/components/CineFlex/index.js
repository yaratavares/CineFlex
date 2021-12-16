import "../../css/reset.css";

import HeaderPage from "../HeaderPage";
import FilmPage from "../FilmPage";

export default function CineFlex() {
  return (
    <div className="container">
      <HeaderPage />
      <FilmPage />
    </div>
  );
}
