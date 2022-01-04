var express = require('express')
var data = express()
var bodyParser = require('body-parser')
var sql = require('mysql')
var mysql = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"vcard"
})
mysql.connect()
data.set("view engine","pug")
data.set("views","./views")
var urlencoded = bodyParser.urlencoded({extended:false})

data.get('/',function (req,res) {
    mysql.query("select * from rms", function (error,result) {
        if (error) throw error
        res.render('homepage',{"data":result})
        console.log(result);
    })
})
data.post('/',urlencoded,function (req,res) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let father_name = req.body.father_name;
    let contact = req.body.contact;
    let maths = req.body.maths;
    let sci = req.body.sci;
    let sst = req.body.sst;
    let hindi = req.body.hindi;
    let eng = req.body.eng;
    mysql.query(`insert into rms (first_name,last_name,father_name,contact,maths,sci,sst,hindi,eng) values ('${fname}','${lname}','${father_name}','${contact}','${maths}','${sci}','${sst}','${hindi}','${eng}')`, function (error) {
        if (error) throw error;
            console.log("inserted successfully");
            res.redirect("/")
    })
})

data.get("/delete/:id",function(req,res){
    mysql.query(`delete from rms where id = '${req.params.id}'`,function(error){
        if(error) throw error;
        console.log("deleted successfully")
        res.redirect("/")
    })
})

data.get("/edit/:id",function(req,res){
    let id = req.params.id;
    mysql.query(`select * from rms where id ='${id}'`,function(error, result) {
        if(error) throw error;
        res.render("edit",{"data":result[0]});
    })
})

data.post('/edit/:id',urlencoded,function (req,res) {
    let {fname,lname,father_name,contact,maths,sci,sst,hindi,eng} = req.body;
   
    mysql.query(`update rms set first_name='${fname}',last_name='${lname}',father_name='${father_name}',contact='${contact}',maths='${maths}',sci='${sci}',sst='${sst}',hindi='${hindi}',eng='${eng}' where id='${req.params.id}'`, function (error) {
        if (error) throw error;
            console.log("updated successfully");
            res.redirect("/")
    })
})



data.listen(8081);