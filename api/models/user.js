var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    fullnames: {type: String, required: true},
    telefono: {type: String, required: false},
    rol: {type: String, required: true},
    genero: {type: String, required: true},
    n_doc: {type: String, required: false},
    password: {type: String, required: true},
    estado: {type: Boolean,default: true ,required: true},
    createdAt : {type: Date, default: Date.now, required : true}, 
});

module.exports = mongoose.model('user',UserSchema);