'use strict'

var express = require('express');
var UserController = require('../controllers/UserController');

var app = express.Router();

var auth = require('../middlewares/authenticate');

app.post('/registro_user_admin',auth.auth,UserController.registro_user_admin);
app.post('/login_admin',UserController.login_admin);
app.get('/listar_users_admin',auth.auth,UserController.listar_users_admin);
app.put('/cambiar_estado_user_admin/:id',auth.auth,UserController.cambiar_estado_user_admin);
app.get('/obtener_user_admin/:id',auth.auth,UserController.obtener_user_admin);
app.put('/actualizar_admin_admin/:id',auth.auth,UserController.actualizar_admin_admin);

module.exports = app;