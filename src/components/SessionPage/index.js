import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../LoadingPage";

import "./style.css";

export default function SessionPage({ setPageControl }) {
  const [daySession, setDaySession] = useState();
  const { idFilme } = useParams();

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`
    );
    promisse.then((answer) => {
      setDaySession(answer.data);
      setPageControl("session");
    });
  }, []);

  if (!daySession || daySession === undefined) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="sessionPage">
        <div className="title">
          <p>Selecione o horário</p>
        </div>
        <div className="sessionsFilm">
          {daySession.days.map((day) => (
            <div className="session" key={day.id + "session"}>
              <div className="daySession">
                <p>{day.weekday + " - " + day.date}</p>
                <div className="schedules">
                  {day.showtimes.map((time, index) => (
                    <Link to={`/assentos/${time.id}`}>
                      <button key={index + time.id}>{time.name}</button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <div className="boxImage">
          <div className="littleImage">
            <img src={daySession.posterURL}></img>
          </div>
        </div>
        <div className="informationFilm">
          <p>{daySession.title}</p>
        </div>
      </footer>
    </>
  );
}
