import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import LoadingPage from "../LoadingPage";
import "./style.css";

export default function SeatPage({ request, setRequest }) {
  const [filmSeat, setFilmSeat] = useState();
  const [seatsIds, setSeatsIds] = useState([]);
  const [inputCpf, setInputCpf] = useState();
  const [inputName, setInputName] = useState();
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
    return <LoadingPage />;
  }

  function clickSeat(isAvaible, number) {
    if (!isAvaible) {
      alert("Esse assento não está disponível");
    } else if (seatsIds.includes(number)) {
      const index = seatsIds.indexOf(number);
      const arr = [...seatsIds];
      arr.splice(index, 1);
      setSeatsIds(arr);
    } else {
      setSeatsIds([...seatsIds, number]);
    }
  }

  function clickFinal() {
    const axiosForPost = { ids: seatsIds, name: inputName, cpf: inputCpf };

    const promisse = axios.post(
      "https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many",
      axiosForPost
    );

    setRequest({
      ...axiosForPost,
      movie: filmSeat.movie.title,
      date: filmSeat.day.date,
      weekday: filmSeat.day.weekday,
      time: filmSeat.name,
    });

    if (!request || request === undefined) {
      return <LoadingPage />;
    }

    promisse.then(() => alert("Prepare a pipoca!"));
    promisse.catch(() => alert("Ocorreu um erro, tente novamente"));
  }

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
              key={seat.id}
              onClick={() => clickSeat(seat.isAvailable, seat.name)}
              click={seatsIds}
              number={seat.name}
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
            <input
              placeholder="Digite seu nome..."
              onChange={(e) => setInputName(e.target.value)}
            ></input>
          </div>
          <div className="dataInput">
            <p>CPF do comprador:</p>
            <input
              placeholder="Digite seu CPF..."
              onChange={(e) => setInputCpf(e.target.value)}
            ></input>
          </div>
        </div>
        <Link to="/sucesso">
          <div className="reserve" onClick={clickFinal}>
            <button>Reservar assento(s)</button>
          </div>
        </Link>
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

  background-color: ${({ cor, click, number }) =>
    cor ? (click.includes(number) ? "#8dd7cf" : "#c3cfd9") : "#fbe192"};
  border: 1px solid
    ${({ cor, click, number }) =>
      cor ? (click.includes(number) ? "#1aae9e" : "#7b8b99") : "#f7c52b"};

  display: flex;
  align-items: center;
  justify-content: center;
`;
