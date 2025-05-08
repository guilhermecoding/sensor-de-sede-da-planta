const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const serial = new SerialPort({
  path: 'COM9',
  baudRate: 9600,
});

const parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }));

let ultimoValor = 0;

parser.on('data', (data) => {
  const valorLimpo = data.trim();
  const valor = parseInt(valorLimpo, 10);

  if (!isNaN(valor)) {
    ultimoValor = valor;
  } else {
    console.warn("Valor inválido:", valorLimpo);
  }
});

app.get('/umidade', (req, res) => {
    
  res.json({ umidade: ultimoValor }); // ✅ CORRETO
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
