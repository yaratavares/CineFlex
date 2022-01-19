import { Link } from "react-router-dom";
import "./style.css";

export default function SucessPage({ request }) {
  return (
    <div className="sucessPage">
      <div className="title">
        <p>
          Pedido feito
          <br />
          com sucesso!
        </p>
      </div>
      <div className="dadosAPI">
        <p className="littleTitle">Filme e sessão</p>
        <p className="data">
          {request.movie}
          <br />
          {request.date + " " + request.time}
        </p>
      </div>
      <div>
        <p className="littleTitle">Ingressos</p>
        <div className="data">
          {request.ids.map((seat) => (
            <p key={seat}>Assento {seat}</p>
          ))}
        </div>
      </div>
      <div>
        <p className="littleTitle">Comprador</p>
        <p className="data">
          Nome: {request.name}
          <br />
          CPF: {request.cpf}
        </p>
      </div>
      <Link to="/">
        <div className="buttonHome">
          <button>Voltar pra Home</button>
        </div>
      </Link>
    </div>
  );
}
