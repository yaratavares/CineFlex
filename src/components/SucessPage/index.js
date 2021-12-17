import "./style.css";

export default function SucessPage() {
  const request = { ids: [1, 2, 3], name: "Fulano", cpf: "12345678900" };

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
          Enola Holmes
          <br />
          24/06/2021 15:00
        </p>
      </div>
      <div>
        <p className="littleTitle">Ingressos</p>
        <div className="data">
          {request.ids.map((seat) => (
            <p>Assento {seat}</p>
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
      <div className="buttonHome">
        <button>Voltar pra Home</button>
      </div>
    </div>
  );
}
