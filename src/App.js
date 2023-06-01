import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import EtiquetaForm from "./Form/EtiquetaForm";
import { MdSettings, MdPrint } from 'react-icons/md';

function App() {
  const [dataOperacao, setDataOperacao] = useState("");
  const [pedido, setPedido] = useState("");
  const [cliente, setCliente] = useState("");
  const [loja, setLoja] = useState("");
  const [volume, setVolume] = useState("");

  const [qrCodeValue, setQRCodeValue] = useState("");
  const [shouldPrint, setShouldPrint] = useState(false);
  const [printSize, setPrintSize] = useState("10cm 5cm");

  const printRef = useRef(null);

  const generateQRCodeData = () => {
    const texto_livre = `${dataOperacao}\t  ${pedido}\t ${cliente}\t  ${loja}\t  ${volume}`;
    return texto_livre;
  };

  useEffect(() => {
    if (qrCodeValue !== '' && shouldPrint) {
      const printContent = printRef.current;
      console.log(printContent);

      const printDocument = document.createElement('div');
      printDocument.innerHTML = `
        <div class="print-copy">${printContent.innerHTML}</div>
        <div class="print-copy">${printContent.innerHTML}</div>
        <div class="print-copy">${printContent.innerHTML}</div>
      `;

      document.body.appendChild(printDocument);

      window.print();
      setShouldPrint(false);

      // Clean up the dynamically added print document
      document.body.removeChild(printDocument);
    }
  }, [qrCodeValue, shouldPrint]);

  const updateQrCode = (event) => {
    event.preventDefault();
    const qrCodeData = generateQRCodeData();
    setQRCodeValue(qrCodeData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShouldPrint(true);
    updateQrCode(event);
  };

  useEffect(() => {
    const printStyles = `
      @media print {
        @page {
          size: ${printSize};
          margin: 0;
          padding: 0;
        }
      }
    `;

    // Add the printStyles to the <style> tag
    const styleElement = document.createElement("style");
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);
  }, [printSize]);

  const handlePrintSizeChange = () => {
    const newSize = prompt("Enter the desired print size (e.g., 10cm 5cm)");
    setPrintSize(newSize);
  };

  return (
    <>
      <div className="main__content">
        <div className="printSizeParent">
          {/* Logotipo */}
          <button className="logotipo"></button>

          {/* Title field */}
          <div className="title printTitle">
            <h2 className="title__h2">ETIQUETA DE ESTOQUE</h2>
          </div>

          {/* Change print size button */}
          <button className="printSize" onClick={handlePrintSizeChange}>
            <MdSettings />
          </button>
        </div>

        {/* Parent fields and QR Code */}
        <div className="parent">
          {/* Form fields */}
          <div className="fields">
            <EtiquetaForm
              handleSubmit={handleSubmit}
              dataOperacao={dataOperacao}
              setDataOperacao={setDataOperacao}
              pedido={pedido}
              setPedido={setPedido}
              cliente={cliente}
              setCliente={setCliente}
              loja={loja}
              setLoja={setLoja}
              volume={volume}
              setVolume={setVolume}
            />
          </div>

          {/* QR Code Field */}
          <div className="qrcode__field">
            <QRCode key={qrCodeValue} value={qrCodeValue} className="qrcode" />
          </div>
        </div>
      </div>

      <div className="buttons">
        {/* Print button */}
        <div className="printParent">
          <div className="printButton">
            <button className="print__btn" onClick={handleSubmit}>
              <MdPrint /> Print
            </button>
          </div>
        </div>
      </div>

      {/* Hidden print content */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          {/* Content to be printed */}
          <div className="main__content">
            <div className="printSizeParent">
              <button className="logotipo"></button>
              <div className="title printTitle">
                <h2 className="title__h2">ETIQUETA DE ESTOQUE</h2>
              </div>
              <button className="printSize" onClick={handlePrintSizeChange}>
                <MdSettings />
              </button>
            </div>
            <div className="parent">
              <div className="fields">
              {console.log(qrCodeValue)}
                <EtiquetaForm
                  dataOperacao={dataOperacao}
                  setDataOperacao={setDataOperacao}
                  pedido={pedido}
                  setPedido={setPedido}
                  cliente={cliente}
                  setCliente={setCliente}
                  loja={loja}
                  setLoja={setLoja}
                  volume={volume}
                  setVolume={setVolume}
                />
              </div>

              {/* Generate new qrcode here */}
              <div className="qrcode__field">
                <QRCode key={qrCodeValue} value={qrCodeValue} className="qrcode" />
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
