const express = require('express');
const mysql = require('mysql');
const app = express();
const multer = require('multer');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const _=require('lodash')
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
// app.use(fileUpload({
//     createParentPath: true
//
// }))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended : true}))
app.get('/create', (req, res) => {
    res.render('create')
});
app.post('/create',upload.none(),(req, res) => {
    // try{
    //     if (!req.files){
    //         res.send({
    //             status: false,
    //             message : 'Not file uploads'
    //
    //         })
    //
    //     } else {
    //         let img = req.files.img;
    //         console.log(img)
    //        img.mv('./uploads/' + img.name);
    //         res.send({
    //             status :true,
    //             message : 'File is uploading !',
    //             data :{
    //                 name : img.name,
    //                 mimetype: img.mimetype,
    //                 size :img.size
    //             }
    //
    //         })
    //
    //     }
    //         } catch (err){
    //     res.status(500).send(err)
    // }
    const {name, img, age} = req.body;
    console.log(req.body)
    const values = [
        [name,img, age]
    ]
    let sql = `INSERT INTO staffs (name, img, age ) values ?`;
    connection.query(sql,[values], (err,result)=>{
        if (err){
            console.log(err)
        } else {
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
    let sql = `SELECT *FROM staffs  WHERE id = ${id}`
    connection.query(sql,(err,result)=>{
        if (err)throw Error(err);
        res.render('detail',{staffs: result })
    })
});
app.get('/offset/1',(req, res) => {
    let sql = "SELECT * FROM staffs LIMIT 5 OFFSET 0";
    connection.query(sql,(err,result)=>{
        if (err)throw Error(err);
        res.render('offset',{staffs: result })
    })
});app.get('/offset/2',(req, res) => {
    let sql = "SELECT * FROM staffs LIMIT 5 OFFSET 5";
    connection.query(sql,(err,result)=>{
        if (err)throw Error(err);
        res.render('offset',{staffs: result })
    })
});
app.get('/delete/:id',(req, res)=>{
    let id = req.params.id;
    let sql = `DELETE FROM staffs WHERE id =`+ id;
    connection.query(sql,err=>{
        if (err) console.log(err);
        res.redirect('/staffs')
    })
});

app.listen(3100,()=>{
    console.log('http://localhost:3100/create')
})