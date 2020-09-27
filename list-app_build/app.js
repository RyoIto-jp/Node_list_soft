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

// server
app.listen(3000, "127.0.0.1");

// 自作jsの読み込み(機能するかテスト中)
// const f = require('./public/js/func.js');

// router

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  // データベースからデータを取得する処理を書いてください
  connection.query(
    'SELECT * FROM list_soft', (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  // データベースに追加する処理を書いてください
  console.log(req.body.itemName);
  connection.query(
    'INSERT INTO list_soft (reg_user, softName, sAbout, sPurpose) VALUES(?,?,?,?)',
    [req.body.reg_user,req.body.softName,req.body.sAbout,req.body.sPurpose],
    (error, results) => {
      res.redirect('/index');
    }
  );
});


app.get('/delete/:id', (req, res) => {
  console.log(req.params.id);
  connection.query(
    'DELETE FROM list_soft WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  )
});

app.get('/edit/:id', (req, res) => {
  console.log(req.params.id);
  connection.query(
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
  connection.query(
    'UPDATE list_soft SET reg_user = ?, softName = ?, sAbout = ?, sPurpose = ? WHERE id = ?',
    [req.body.reg_user,req.body.softName,req.body.sAbout,req.body.sPurpose, req.params.id],
    (error, results) => {
      res.redirect('/index');
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


