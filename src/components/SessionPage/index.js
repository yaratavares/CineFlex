import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";

export default function SessionPage() {
  const [daySession, setDaySession] = useState();
  const { idFilme } = useParams();

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`
    );
    promisse.then((answer) => {
      setDaySession(answer.data.days);
    });
  }, []);

  if (!daySession || daySession === undefined) {
    return <h1>Carregando</h1>;
  }
  console.log(daySession);

  return (
    <>
      <div className="sessionPage">
        <div className="title">
          <p>Selecione o horário</p>
        </div>
        <div className="sessionsFilm">
          {daySession.map((day) => (
            <div className="session" key={day.id}>
              <div className="daySession">
                <p>{day.weekday + " - " + day.date}</p>
                <div className="schedules">
                  {day.showtimes.map((time) => (
                    <button>{time.name}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
