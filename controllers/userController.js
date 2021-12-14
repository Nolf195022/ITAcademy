let User = require('../models/userModel');
let lessonsdb = require('../lessonsdb');
exports.Authentify = function(req,res){
    res.render('login.ejs');
}
exports.makeSession = function(req,res){
    req.session.user = req.body.username;
    res.redirect('/'); 
}
exports.killSession = function(req,res){
    req.session.destroy();
    res.redirect('/');
}
exports.makeSubmitSession = function(req,res){
    req.session.user = req.body.username;
    res.redirect('/submitpanier'); 
}