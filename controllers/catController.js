let Catalogue = require('../models/catModel');
const { type } = require('express/lib/response');
const session = require('express-session');
let lessonsdb = require('../lessonsdb');

exports.catList = function (req, res) {
    let formations = new Catalogue("Formations");
    var subs = [];
    var panier = [];
    if(req.session.panier){
        req.session.panier.forEach(element =>{
            panier.push(parseInt(element));
        });
    }
    lessonsdb.query("SELECT * from lessons",function(err,result){
        if(err) {
            console.log(err);
        }else{       
            result.forEach(formation => {
                formations.addContent(formation);
            });
            if(req.session.user){
                lessonsdb.query("SELECT lesson_id FROM subscriptions WHERE user = ?;", req.session.user,function(err,result){
                    if(err) {
                        console.log(err);
                    }else{
                        result.forEach(formation => {
                            subs.push(formation.lesson_id)
                        });
                        res.render('itacademy.ejs',{data:formations,subs:subs,username:req.session.user,panier:panier});
                    }                
                })
            }else{
                res.render('itacademy.ejs',{data:formations,subs:subs,username:undefined,panier:panier});
            }
    }
})
};