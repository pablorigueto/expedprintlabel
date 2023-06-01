import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import styles from './styles/print.css'
import { MdPrint } from 'react-icons/md';

function App() {
  const [pedido, setPedido] = useState('');
  const [cliente, setCliente] = useState('');
  const [loja, setLoja] = useState('');
  const [transportadora, setTransportadora] = useState('');
  const [volume, setVolume] = useState('');

  const handleChangeVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  const generateQRCodeData = (itemVolume) => {
    return `${pedido}, ${cliente}, ${transportadora}, ${loja}, ${itemVolume}`;
  };

  const renderItemsToPrint = () => {
    if (volume) {
      const qrCodes = [];
      for (let i = 1; i <= volume; i++) {
        const itemVolume = `${i}/${volume}`;
        const itemClass = `cloned-item item-${i}`;
        qrCodes.push(
          <div className={itemClass} key={i}>
            <div>
              <div className="field"><label>Pedido:</label><span className="pedidoNro"> {pedido}</span></div>
              <div className="field"><label>Cliente:</label><span> {cliente}</span></div>
              <div className="field"><label>Loja:</label><span> {loja}</span></div>
              <div className="field"><label>Transp.:</label><span> {transportadora}</span></div>
              <div className="field"><label>Volume:</label><span> {itemVolume}</span></div>
            </div>
            <div className="qrcode">
              <QRCode value={generateQRCodeData(itemVolume)} />
            </div>
          </div>
        );
      }
      return qrCodes;
    }
  };

  const handlePrint = () => {
    window.print();
    resetForm();
  };

  const resetForm = () => {
    setPedido('');
    setCliente('');
    setLoja('');
    setTransportadora('');
    setVolume('');
  };

  return (
    <>
    <div className='main_structure'>

      <div className='topHead'>
        {/* Logotipo */}
        <button className="logotipo">
        </button>

        {/* Title field */}
        <div className="title">
          <h2 className="titleH2">ETIQUETA DE ESTOQUE - EXPEDIÇÃO</h2>
        </div>

      </div>

      <div className='iniFields'>

        <div className='grid'>
          <label>Pedido:</label>
          <input type="text" value={pedido} onChange={(e) => setPedido(e.target.value)} />
        </div>

        <div className='grid'>
          <label>Cliente:</label>
          <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value.slice(0, 54))} maxLength={54} />
        </div>

        <div className='grid'>
          <label>Loja:</label>
          <input type="text" value={loja} onChange={(e) => setLoja(e.target.value)} />
        </div>

        <div className='grid'>
          <label>Transportadora:</label>
          <input type="text" value={transportadora} onChange={(e) => setTransportadora(e.target.value.slice(0, 20))} maxLength={20} />
        </div>

        <div className='grid'>
          <label>Volume:</label>
          <input type="number" value={volume} onChange={handleChangeVolume} />
        </div>
      </div>

    </div>

    <div className='parentPrintBtn'>
      <button className='printBtn' onClick={handlePrint}><MdPrint /> Imprimir</button>
    </div>  

    <div className='renderItemsToPrint'>{renderItemsToPrint()}</div>
    </>
  );
}

export default App;
