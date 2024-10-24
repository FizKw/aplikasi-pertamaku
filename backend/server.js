import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();
app.use(express.json())
// New
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
// New
app.use(cookieParser);

const connection = new sqlite3.Database('./db/aplikasi.db')

// CSRF
var csrfProtection = csrf({cookie: true});

app.get('api/getcsrftoken', csrfProtection, (req, res) => {
  return res.json({csrfToken: req.csrfToken() });
});

app.get('/api/user/:id', csrfProtection, (req, res) => {
  // const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  const query = `SELECT * FROM users WHERE id = ?`;
  // new
  const params = [req.params.id];
  
  console.log(query)
  // connection.all(query, (error, results) => {
    connection.all(query, params, (error, results) => {
    // if (error) throw error;
    if(error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.post('/api/user/:id/change-email', csrfProtection, (req, res) => {
  const newEmail = req.body.email;
  // const query = `UPDATE users SET email = '${newEmail}' WHERE id = ${req.params.id}`;
  const query = `UPDATE users SET email = ? WHERE id = ?`;
  const params = [newEmail, req.params.id];

  // connection.run(query, function (err) {
  //   if (err) throw err;
  //   if (this.changes === 0 ) res.status(404).send('User not found');
  //   else res.status(200).send('Email updated successfully');
  // });
  connection.run(query, params, function (e) {
    if (e) return res.status(500).json({ error: e.message});
    if(this.changes === 0) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });
});

app.get('/api/file', csrfProtection, (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  // New
  const fileName = path.basename(req.query.name);
  const filePath = path.join(__dirname, 'files', fileName);

  // res.sendFile(filePath);
  res.sendFile(filePath, (e) => {
    if(e) res.status(404).send('File not found');
  })
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
