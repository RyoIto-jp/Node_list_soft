// express setup
const express = require('express');
const app = express();

// path文字列の取り扱い
const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files setup (css,images)
app.use(express.static(path.join(__dirname, 'public')));

// Form値受け取り用の定型文
app.use(express.urlencoded({ extended: false }));

// database setup: mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'list_app'
});

// database setup: sqlite3
const sqlite = require('sqlite3').verbose();                                          
const db = new sqlite.Database('mydata.sqlite');

// database setup: sqlite3 better
// const Database = require('better-sqlite3');
// const db = new Database('mydata2.sqlite', { verbose: console.log });

db.run(`
CREATE TABLE IF NOT EXISTS list_soft (
id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL,
reg_user varchar(100) NOT NULL,
softName varchar(100) NOT NULL, 
sAbout longtext NOT NULL,
sPurpose longtext NOT NULL, 
flag_arc varchar(10) DEFAULT NULL)`)


// server
app.listen(3000, "127.0.0.1");

// 自作jsの読み込み(機能するかテスト中)
// const f = require('./public/js/func.js');

// router

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  // connection.query(
  db.all(
    'SELECT * FROM list_soft WHERE flag_arc is NULL', (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );

  // const stmt = db.prepare('SELECT * FROM list_soft WHERE flag_arc is NULL');
  // const list_soft = stmt.all();
  // res.render('index.ejs', {items: list_soft});

});

app.get('/index_cmp', (req, res) => {
  // connection.query(
  db.all(
    'SELECT * FROM list_soft WHERE flag_arc = "cmp"', (error, results) => {
      res.render('index_cmp.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  // connection.query(
  db.run(
    'INSERT INTO list_soft (reg_user, softName, sAbout, sPurpose) VALUES(?,?,?,?)',
    [req.body.reg_user,req.body.softName,req.body.sAbout,req.body.sPurpose],
    (error, results) => {
      res.redirect('/index');
    }
  );
  // const stmt = db.prepare('INSERT INTO list_soft (reg_user, softName, sAbout, sPurpose) VALUES(?,?,?,?)');
  // const info = stmt.run(req.body.reg_user, req.body.softName, req.body.sAbout, req.body.sPurpose);
  // console.log(info.changes); 
  // res.redirect('/index');

});


app.get('/delete/:id', (req, res) => {
  console.log(req.params.id);
  // connection.query(
  db.run(
    'DELETE FROM list_soft WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  )
});

app.get('/edit/:id', (req, res) => {
  console.log(req.params.id);
  // connection.query(
  db.all(
    'SELECT * FROM list_soft WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', { item: results[0] });
    }
  )
});

app.post('/update/:id', (req, res) => {
  console.log(req.body.itemName);
  console.log(req.params.id);
  // connection.query(
  db.run(
    'UPDATE list_soft SET reg_user = ?, softName = ?, sAbout = ?, sPurpose = ? WHERE id = ?',
    [req.body.reg_user,req.body.softName,req.body.sAbout,req.body.sPurpose, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/cmp/:id', (req, res) => {
  let sql;
  let buf;
  buf = req.headers.referer;
  if (buf.indexOf('index_cmp')==-1) {
    sql = 'UPDATE list_soft SET flag_arc = "cmp" WHERE id = ?';
  } else {
    sql = 'UPDATE list_soft SET flag_arc = NULL WHERE id = ?';
  };
  // connection.query(
  db.run(
    sql,[req.params.id],
    (error, results) => {
      res.redirect(buf);
    }
  );
});

// app.★★('/', (req, res) => {
  
// });

  // connection.query(
  //   'SQL method WHERE ★ = ?',
  //   [req.params.id],
  //   (error, results) => {
  //     res.render('★.ejs', { item: results[0] });
  //   }
  // )


