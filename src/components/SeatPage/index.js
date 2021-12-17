import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SeatPage() {
  const [filmSeat, setFilmSeat] = useState();
  const [seatsIds, setSeatsIds] = useState([]);
  const { idSessao } = useParams();

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`
    );
    promisse.then((answer) => {
      setFilmSeat(answer.data);
    });
  }, []);

  if (!filmSeat || filmSeat === undefined) {
    return <h1>Carregando</h1>;
  }

  function click(isAvaible, id) {
    if (!isAvaible) {
      alert("Esse assento não está disponível");
    } else if (seatsIds.includes(id)) {
      const index = seatsIds.indexOf(id);
      const arr = [...seatsIds];
      arr.splice(index, 1);
      setSeatsIds(arr);
    } else {
      setSeatsIds([...seatsIds, id]);
    }
    console.log(id);
  }

  console.log(seatsIds);

  return (
    <>
      <div className="seatPage">
        <div className="title">
          <p>Selecione o(s) assento(s)</p>
        </div>
        <div className="boxSeats">
          {filmSeat.seats.map((seat) => (
            <Seat
              cor={seat.isAvailable}
              key={seat.id + "seat"}
              onClick={() => click(seat.isAvailable, seat.id)}
              click={seatsIds}
              id={seat.id}
            >
              {seat.name}
            </Seat>
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

const Seat = styled.div`
  height: 26px;
  width: 26px;
  background-color: #c3cfd9;
  border: 1px solid #808f9d;
  border-radius: 50px;
  font-size: 11px;

  background-color: ${({ cor, click, id }) =>
    cor ? (click.includes(id) ? "#8dd7cf" : "#c3cfd9") : "#fbe192"};
  border: 1px solid
    ${({ cor, click, id }) =>
      cor ? (click.includes(id) ? "#1aae9e" : "#7b8b99") : "#f7c52b"};

  display: flex;
  align-items: center;
  justify-content: center;
`;
