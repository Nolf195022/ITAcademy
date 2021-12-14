let mysql = require('mysql');
var lessonsdb = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'lessons'
});
lessonsdb.connect(function(error){
    if (error){
        console.log(error);
    }else{
        console.log("connected");
    }
});
module.exports = lessonsdb;