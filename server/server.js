const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001; // Porta onde o servidor vai rodar

app.use(cors());
app.use(express.json()); // Permitir o uso de JSON nas requisições

// Configurando a conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost', // Use 'localhost' se o MySQL estiver rodando localmente
  port: 3306, // A porta padrão do MySQL
  user: 'root', // Seu usuário do MySQL
  password: 'engenharia1', // Sua senha do MySQL
  database: 'clinica' // O nome do banco de dados MySQL
});


db.connect(err => {
  if (err) {
    console.log('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

app.get('/pacientesuser/:cpf', (req, res) => {
  const cpf = req.params.cpf; // Pegando o CPF do paciente da URL
  const query = 'SELECT nome, dataNascimento FROM pacientesuser WHERE CPFusername = ?'; // Use CPFusername em vez de id
  db.query(query, [cpf], (err, result) => {
      if (err) {
          res.status(500).send(err);
      } else {
          if (result.length > 0) {
              res.json(result[0]); // Retorna o paciente encontrado
          } else {
              res.status(404).send('Usuário não encontrado');
          }
      }
  });
});

// Adicione isso ao seu server.js
app.post('/login', (req, res) => {
  const { cpf, password } = req.body; // Pegando o CPF e a senha do corpo da requisição
  const query = 'SELECT * FROM loginpaciente WHERE cpfpaciente = ? AND senhapaciente = ?';
  db.query(query, [cpf, password], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      if (result.length > 0) {
          return res.json({ message: 'Login bem-sucedido', user: result[0] });
      } else {
          return res.status(404).send('Credenciais inválidas');
      }
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
