import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SeatPage() {
  const [filmSeat, setFilmSeat] = useState();
  const { idSessao } = useParams();

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`
    );
    promisse.then((answer) => {
      console.log(answer.data);
      setFilmSeat(answer.data);
    });
  }, []);

  if (!filmSeat || filmSeat === undefined) {
    return <h1>Carregando</h1>;
  }

  return (
    <>
      <div className="seatPage">
        <div className="title">
          <p>Selecione o(s) assento(s)</p>
        </div>
        <div className="boxSeats">
          {filmSeat.seats.map((seat) => (
            <div
              className={`seat ${
                seat.isAvailable ? "available" : "unavailable"
              }`}
              key={seat.id + "seat"}
            >
              {seat.name}
            </div>
          ))}
        </div>
        <div className="boxModelSeats">
          <div className="seatModel">
            <div className="seat select"></div>
            <p>Selecionado</p>
          </div>
          <div className="seatModel">
            <div className="seat avaible"></div>
            <p>Disponível</p>
          </div>
          <div className="seatModel">
            <div className="seat unavailable"></div>
            <p>Indisponível</p>
          </div>
        </div>

        <div className="boxInputs">
          <div className="dataInput">
            <p>Nome do comprador:</p>
            <input placeholder="Digite seu nome..."></input>
          </div>
          <div className="dataInput">
            <p>CPF do comprador:</p>
            <input placeholder="Digite seu CPF..."></input>
          </div>
        </div>
        <div className="reserve">
          <button>Reservar assento(s)</button>
        </div>
      </div>
      <footer>
        <div className="boxImage">
          <div className="littleImage">
            <img src={filmSeat.movie.posterURL}></img>
          </div>
        </div>
        <div className="informationFilm">
          <p>
            {filmSeat.movie.title} <br></br>
            {filmSeat.day.weekday + " - " + filmSeat.name}
          </p>
        </div>
      </footer>
    </>
  );
}
