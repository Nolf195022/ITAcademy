let express = require('express');
let router = express.Router();

let catController = require('./controllers/catController');
let panierController = require('./controllers/panierController');
let userController = require('./controllers/userController');

router.get('/',catController.catList);
router.get('/login',userController.Authentify);
router.get('/logout',userController.killSession);
router.get('/panier',panierController.panierList);
router.get('/addpanier/:id',panierController.panierAdd);
router.get('/removepanier/:id',panierController.panierRemove);
router.get('/removestaypanier/:id',panierController.panierRemovePanier);
router.get('/submitpanier',panierController.panierSubmit);
router.post('/setusersubmit',userController.makeSubmitSession);
router.post('/setuser',userController.makeSession);


module.exports = router;