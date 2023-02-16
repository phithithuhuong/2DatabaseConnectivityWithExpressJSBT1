const express = require('express');
const mysql = require('mysql');
const app = express();
const multer = require('multer');
const e = require("express");
const upload = multer()
app.set('view engine', 'ejs');
app.set('views', './views')
const connection = mysql.createConnection({
    host:'localhost',
    user :'root',
    password :'123456',
    database : 'member'
})
connection.connect((err,result)=>{
    if (err){
        console.log(err)
    } else {
        console.log(' connection success !')
    }
})
app.get('/create', (req, res) => {
    res.render('create')
});
app.post('/create',upload.none(),(req, res) => {
    const {name, img, age} = req.body;
    console.log(req.body)
    const values =[
        [name,img, age]
    ]
    let sql = `INSERT INTO staffs (name, img, age ) values ?`;
    connection.query(sql,[values], (err,result)=>{
        if (err){
            console.log(err)
        } else {
            console.log(result)
           res.redirect('staffs')
        }
    });


})
app.get('/staffs',(req, res) => {
    let sql = `SELECT *FROM staffs `;
    connection.query(sql,(err,result)=>{
        if (err)throw Error(err);
        res.render('staffs',{staffs: result })
    })
});
app.get('/detail/:id',(req, res) => {
    let id = req.params.id
    console.log(id)
    let sql = `SELECT *FROM staffs  WHERE id =`+ id;
    connection.query(sql,(err,result)=>{
        if (err)throw Error(err);
        res.render('detail',{staffs: result })
    })
});
app.get('/delete/:id',(req, res)=>{
    let id = req.params.id;
    let sql = `DELETE FROM staffs WHERE id =`+ id;
    connection.query(sql,err=>{
        if (err) console.log(err);
        res.redirect('/staffs')
    })

})
app.listen(3100,()=>{
    console.log('http://localhost:3100/create')
})