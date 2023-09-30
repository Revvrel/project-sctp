import './App.css';
import React from "react";
import QRCode from "react-qr-code";

function App() {

  return (
    <div className="App">
      <QRCode value = "test" />
    </div>
  );
}

export default App;
