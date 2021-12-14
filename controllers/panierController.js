let Panier = require('../models/panierModel');
let lessonsdb = require('../lessonsdb');
const session = require('express-session');
exports.panierList = function(req,res){
    let monpanier = new Panier(req.session.user);
    function display(){
        let statement = "SELECT * FROM lessons WHERE id IN (";
        first = true;
        for(let i = 0; i < req.session.panier.length; i++){
            if(first == true){
                statement += req.session.panier[i];
                first = false;
            }else{
                statement += " ,"
                statement += req.session.panier[i];
            }
        }
        statement += ");";
        lessonsdb.query(statement ,function(err,result){
                if(err) {
                    console.log(err);
                }else{
                    result.forEach(formation => {
                        monpanier.addContent(formation)
                    })
                }
                res.render('panier.ejs',{data:monpanier,username:req.session.user}); 
            })
    }
    if(req.session.panier){if(req.session.panier.length>0){
        if(req.session.user){
            lessonsdb.query("SELECT lesson_id FROM subscriptions WHERE user = ?;", req.session.user,function(err,result){
                if(err){
                    console.log(err);
                }else{
                    for(let i = 0; i < req.session.panier.length; i++){
                        result.forEach(formation => {
                            if(req.session.panier[i] == formation.lesson_id){
                                req.session.panier.splice(i,1);
                            }
                        });
                    }
                    if(req.session.panier.length==0){
                        res.render('panier.ejs',{data:monpanier,username:req.session.user});
                        return;
                    }
                    console.log('ici');
                    console.log(req.session.panier);
                    display();
                    return;
                }})
        }else{
            display();
            return;
        }
    }else{
            res.render('panier.ejs',{data:undefined,username:req.session.user});
        }
    }else{
        res.render('panier.ejs',{data:undefined,username:req.session.user});
    }
} 
exports.panierAdd = function(req,res){
    if(req.session.panier){
        req.session.panier.push(req.params.id);
    }else{
        req.session.panier = [];
        req.session.panier.push(req.params.id);
    }
    res.redirect('/');
}
exports.panierRemove = function(req,res){
    for(let i = 0; i < req.session.panier.length; i++){
        if(req.session.panier[i]==req.params.id){
            req.session.panier.splice(i,1);
        }
    }
    res.redirect('/');
}
exports.panierRemovePanier = function(req,res){
    console.log('ok5');
    console.log(req.session.panier);
    for(let i = 0; i < req.session.panier.length; i++){
        if(req.session.panier[i]==req.params.id){
            req.session.panier.splice(i,1);
        }
    }
    console.log('ok6')
    res.redirect('/panier');
}
exports.panierSubmit = function(req,res){
    if(req.session.user){
        if(req.session.panier && req.session.panier.length>0){
            for(let i = 0; i < req.session.panier.length; i++){
                lessonsdb.query("INSERT INTO subscriptions set ?", {"lesson_id":req.session.panier[i],"user":req.session.user}, function(err,res){
                    if(err) {
                        console.log(err);
                    }
                })
            }
            req.session.panier = undefined;
            res.redirect('/');
        }else{
            res.redirect('/')
        }
    }else{
        res.render('login-required.ejs')
    } 
}