import styles from "../styles/print.css";

function EtiquetaForm({
  handleSubmit,
  dataOperacao,
  setDataOperacao,
  pedido,
  setPedido,
  cliente,
  setCliente,
  loja,
  setLoja,
  volume,
  setVolume,
}) {

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setDataOperacao(formattedDate);
  };

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="data">Data:</label>
          <button
            type="button"
            className="button__currentDate"
            onClick={getCurrentDate}
          >
            Data Atual
          </button>

          <input
            type="text"
            id="data"
            name="data"
            required
            placeholder="dia/mes/ano"
            className="input__data input__field"
            value={dataOperacao}
            onChange={(e) => setDataOperacao(e.target.value)}
          />

        </div>

        <div className="form__field">
          <label htmlFor="pedido">Pedido:</label>
          <input type="text"
            id="pedido"
            name="pedido"
            required
            className="input__user input__field"
            value={pedido}
            onChange={(e) => setPedido(e.target.value)}
          />
        </div>

        <div className="form__field">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            required
            className="input__user input__field"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>

        <div className="form__field">
          <label htmlFor="loja">Loja:</label>
          <input
            type="text"
            id="loja"
            name="loja"
            required
            value={loja}
            onChange={(e) => setLoja(e.target.value)}
            className="input__user input__field"
          />
        </div>

        <div className="form__field">
          <label htmlFor="volume">Volume:</label>
          <select
            id="volume"
            name="volume"
            required
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="input__user input__field"
          >
            {[...Array(300)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

      </form>
    </div>
    </>
  )
}

export default EtiquetaForm;
