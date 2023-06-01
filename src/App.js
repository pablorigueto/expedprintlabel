import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import EtiquetaForm from "./Form/EtiquetaForm";
import { MdSettings, MdPrint } from 'react-icons/md';

function App() {
  const [dataOperacao, setDataOperacao] = useState("");
  const [pedido, setPedido] = useState("");
  const [cliente, setCliente] = useState("");
  const [loja, setLoja] = useState("");
  const [volume, setVolume] = useState([]);

  const [qrCodeValue, setQRCodeValue] = useState("");
  const [shouldPrint, setShouldPrint] = useState(false);
  const [printSize, setPrintSize] = useState("10cm 5cm");
  const [duplicateCount, setDuplicateCount] = useState(1);

  const generateQRCodeData = () => {
    const texto_livre = `${dataOperacao}\t  ${pedido}\t ${cliente}\t  ${loja}\t  ${volume}`;
    return texto_livre;
  };

  useEffect(() => {
    if (qrCodeValue !== '' && shouldPrint) {
      window.print();
      setShouldPrint(false);
    }
  }, [qrCodeValue, shouldPrint]);

  const updateQrCode = (event) => {
    event.preventDefault();
    const qrCodeData = generateQRCodeData();
    setQRCodeValue(qrCodeData);
  };

  const updateDuplicateCount = () => {
    setDuplicateCount(volume.length > 0 ? volume.length : 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const modifiedVolumeValues = Array.from({ length: volume }, (_, index) => {
      const fraction = `${index + 1}/${volume}`;
      return fraction;
    });
  
    setVolume(modifiedVolumeValues);
  
    // Call updateDuplicateCount here to update duplicateCount before submit
    updateDuplicateCount();
  
    setShouldPrint(true);
  
    // Delay the execution of updateQrCode using setTimeout
    setTimeout(() => {
      updateQrCode(event);
    }, 0);
  };

  useEffect(() => {
    updateDuplicateCount();
  }, [volume]);

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
      <div>
        {Array.from({ length: duplicateCount }, (_, index) => (
          <React.Fragment key={index}>
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
                    volume={volume.length > 0 ? volume[index] : ""}
                    setVolume={setVolume}
                  />
                </div>

                {/* QR Code Field */}
                <div className="qrcode__field">
                  <QRCode key={qrCodeValue} value={qrCodeValue} className="qrcode" />
                </div>
              </div>

            </div>

            {index === 0 && (
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
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default App;
