const express = require('express');
const mysql = require('mysql2/promise'); // Usando a versão de promessas do mysql2
const cors = require('cors');

const app = express();
const port = 3001; // Porta onde o servidor vai rodar

app.use(cors());
app.use(express.json()); // Permitir o uso de JSON nas requisições

// Configurando a conexão com o MySQL
const dbConfig = {
  host: '10.0.0.40', // Use 'localhost' se o MySQL estiver rodando localmente
  port: 3306, // A porta padrão do MySQL
  user: 'root', // Seu usuário do MySQL
  password: 'engenharia1', // Sua senha do MySQL
  database: 'clinica' // O nome do banco de dados MySQL
};

// Função para obter conexão ao banco de dados
const getConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado ao MySQL!');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar no MySQL:', error);
    throw error;
  }
};

// Rota para buscar paciente pelo CPF
app.get('/pacientesuser/:cpf', async (req, res) => {
  const cpf = req.params.cpf; // Pegando o CPF do paciente da URL
  const query = 'SELECT nome, dataNascimento FROM pacientesuser WHERE CPFusername = ?';

  try {
    const db = await getConnection();
    const [result] = await db.query(query, [cpf]);

    if (result.length > 0) {
      res.json(result[0]); // Retorna o paciente encontrado
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { cpf, password } = req.body; // Desestruture CPF e senha do corpo da requisição
  const query = 'SELECT * FROM loginpaciente WHERE cpfpaciente = ? AND senhapaciente = ?';
  
  try {
    const db = await getConnection();
    const [result] = await db.query(query, [cpf, password]);

    if (result.length > 0) {
      return res.json(result[0]); // Login bem-sucedido
    } else {
      return res.status(404).send('Usuário não encontrado');
    }
  } catch (err) {
    res.status(500).send('Erro ao fazer login: ' + err);
  }
});

// Rota para buscar especialidades
app.get('/especialidades', async (req, res) => {
  const query = 'SELECT DISTINCT especialidade FROM medicos';

  try {
    const db = await getConnection();
    const [results] = await db.query(query);
    const specialties = results.map(row => ({ especialidade: row.especialidade }));

    res.json(specialties);
  } catch (error) {
    console.error("Erro ao buscar especialidades:", error);
    res.status(500).json({ error: 'Erro ao buscar especialidades' });
  }
});

// Rota para buscar médicos por especialidade
app.get('/medicos/:especialidade', async (req, res) => {
  const especialidade = req.params.especialidade;
  const query = 'SELECT * FROM medicos WHERE especialidade = ?';

  try {
    const db = await getConnection();
    const [results] = await db.query(query, [especialidade]);

    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar médicos:', err);
    res.status(500).json({ error: 'Erro ao buscar médicos' });
  }
});

// Rota para buscar a última consulta de um paciente
app.get('/ultima-consulta/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  const query = `
    SELECT a.dataConsulta, m.nome AS medicoNome, m.especialidade AS medicoEspecialidade
    FROM agendamentos a
    JOIN medicos m ON a.medicoIdAgendamento = m.id
    WHERE a.pacienteCPFagendamento = ? AND a.dataConsulta < NOW()
    ORDER BY a.dataConsulta DESC
    LIMIT 1
  `;

  try {
    const db = await getConnection();
    const [result] = await db.query(query, [cpf]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Nenhuma consulta anterior encontrada." });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Erro ao buscar última consulta:", error);
    res.status(500).json({ error: "Erro ao buscar última consulta" });
  }
});

// Rota para buscar receitas de um paciente
app.get('/receitas/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT medicacao, dosagem, frequencia FROM receitas WHERE pacienteCPFreceita = ?';

  try {
    const db = await getConnection(); // Conexão ao banco de dados
    const [results] = await db.query(query, [cpf]);

    if (results.length > 0) {
      res.json(results); // Retorna todas as receitas encontradas
    } else {
      res.status(404).send('Nenhuma receita encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    res.status(500).send('Erro ao buscar receitas');
  }
});

app.get('/consultas/:cpf', async (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT DATE(dataConsulta) as dataConsulta FROM agendamentos WHERE pacienteCPFagendamento = ?';

  try {
    const db = await getConnection();
    const [results] = await db.query(query, [cpf]);

    if (results.length > 0) {
      res.json(results); // Retorna todas as consultas encontradas
    } else {
      res.status(404).send('Nenhuma consulta encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    res.status(500).send('Erro ao buscar consultas');
  }
});

app.get('/medicos/search/:query', async (req, res) => {
  const query = req.params.query;
  const sql = `
    SELECT * FROM medicos 
    WHERE nome LIKE ? OR especialidade LIKE ?
  `;
  
  try {
    const db = await getConnection();
    const [results] = await db.query(sql, [`%${query}%`, `%${query}%`]);

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('Nenhum médico encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    res.status(500).send('Erro ao buscar médicos');
  }
});

//PROXIMA CONSULTA
app.get('/proxima-consulta/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  try {
      const connection = await mysql.createConnection(dbConfig);

      // Consulta para buscar o próximo agendamento com data futura
      const [rows] = await connection.execute(`
          SELECT a.dataConsulta, m.nome AS medicoNome, m.especialidade AS medicoEspecialidade
          FROM agendamentos a
          JOIN medicos m ON a.medicoIdAgendamento = m.id
          WHERE a.pacienteCPFagendamento = ? 
            AND a.dataConsulta > NOW()  -- Somente consultas futuras
            AND a.status = 'Agendado'
          ORDER BY a.dataConsulta ASC  -- Ordena pela consulta mais próxima
          LIMIT 1
      `, [cpf]);

      if (rows.length === 0) {
          return res.status(404).json({ message: 'Nenhuma consulta futura encontrada.' });
      }

      res.json(rows[0]); // Retorna a próxima consulta encontrada
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar a consulta.' });
  }
});

//BUSCAR AGENDAMENTOS DE UM MÉDICO
app.get('/agendamentos/:medicoId', async (req, res) => {
  const medicoId = req.params.medicoId;
  const query = 'SELECT * FROM agendamentos WHERE medicoIdAgendamento = ?';
  
  try {
    const db = await getConnection(); // Obtenha a conexão ao banco de dados
    const [results] = await db.query(query, [medicoId]); // Execute a consulta

    return res.status(200).json(results); // Retorne os resultados
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

//AGENDAR UM PACIENTE
app.post('/agendamentos-cadastro', async (req, res) => {
  const { dataConsulta, cpf, medicoId } = req.body;
  const sqlInsert = 'INSERT INTO Agendamentos (pacienteCPFagendamento, medicoIdAgendamento, dataConsulta) VALUES (?, ?, ?)';

  try {
    const db = await getConnection(); // Obtém a conexão com o banco
    await db.query(sqlInsert, [cpf, medicoId, dataConsulta]); // Executa a query

    // Modifique esta linha para retornar um objeto JSON em caso de sucesso
    res.status(200).json({ message: 'Agendamento realizado com sucesso' });
  } catch (err) {
    console.error('Erro ao realizar agendamento:', err);
    res.status(500).json({ error: 'Erro ao realizar agendamento' });
  }
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
