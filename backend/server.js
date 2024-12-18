import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const HOST_NAME = `${process.env.API_URL}` || 'http://localhost';

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: `${HOST_NAME}`,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'CSRF-Token'],
}));




const connection = new sqlite3.Database('./db/aplikasi.db')
app.get('api/getcsrftoken', (req, res) => {
  return res.json({csrfToken: req.csrfToken() });
});

app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  const params = [req.params.id];
  
  connection.all(query, params, (error, results) => {
    if(error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const query = `UPDATE users SET email = ? WHERE id = ?`;
  const params = [newEmail, req.params.id];

  connection.run(query, params, function (e) {
    if (e) return res.status(500).json({ error: e.message});
    if(this.changes === 0) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });
});

app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  const fileName = path.basename(req.query.name);
  const filePath = path.join(__dirname, 'files', fileName);

  const allowedFiles = ['file.txt'];
  if(!allowedFiles.includes(req.query.name)){
    return res.status(403).send('Forbidden');
  }

  res.sendFile(filePath, (e) => {
    if(e) res.status(404).send('File not found');
  })
});

app.all("*", (_req, res) => {
  return nootFound(res, "Route not found");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
