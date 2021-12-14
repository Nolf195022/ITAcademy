let express = require('express');
let app = express();
let session = require('express-session');
let routes = require('./routes')
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized : true})
    );
app.use('/',routes)

app.listen(3000,function(){
    console.log('server is running on port 3000')
});