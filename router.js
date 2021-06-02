const express = require('express');
const router = express.Router();


var authAdmin = function(req, res, next) {
    if (req.session && req.session.rol == 'admin') {
        return next();
    } else
        return res.sendStatus(401);
};

var authVendedor = function(req, res, next) {
    if (req.session && req.session.rol == 'vendedor' || req.session.rol == 'admin') {
        return next();
    } else
        return res.sendStatus(401);
};


//CRUD de usuarios
const UsuariosController = require('./controllers/UsuariosController');
router.get('/', authAdmin, UsuariosController.get)
router.get('/users/:rol', authAdmin, UsuariosController.get)
router.get('/user/view/new', authAdmin, UsuariosController.new)
router.get('/user/view/edit/:id', authAdmin, UsuariosController.edit)
router.get('/user/delete/:id', authAdmin, UsuariosController.delete)
router.post('/user/update', authAdmin, UsuariosController.update)
router.post('/user/create', authAdmin, UsuariosController.create)



//CRUD de clientes
const ClientesController = require('./controllers/ClientesController')
router.get('/clientes', authVendedor, ClientesController.get)
router.get('/cliente/view/new', authVendedor, ClientesController.new)
router.get('/cliente/view/edit/:id', authVendedor, ClientesController.edit)
router.get('/cliente/delete/:id', authVendedor, ClientesController.delete)
router.post('/cliente/create', authVendedor, ClientesController.create)
router.post('/cliente/update', authVendedor, ClientesController.update)

//Auth Routes
const AuthController = require('./controllers/Auth.controller')
router.get('/login', AuthController.get)
router.post('/auth', AuthController.login)
router.get('/logout', AuthController.logout)

//REPORTES
const ReportesController = require('./controllers/ReportesController')
router.get('/reportes/:page', authVendedor, ReportesController.get)
router.get('/reportes', authVendedor, ReportesController.download)


module.exports = router;