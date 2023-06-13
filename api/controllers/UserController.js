var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const login_admin = async function(req,res){

    let data = req.body;
    console.log(req.body);
    var users = await User.find({email:data.email});


    try {
        if(users.length >= 1){
            //si hay cuenta
            if(users[0].estado){
                bcrypt.compare(data.password,users[0].password, function(err,check){
                    if(check){
                        res.status(200).send({
                            data: users[0],
                            token: jwt.createToken(users[0])
                        });
                    }else{
                        res.status(200).send({data:undefined,message:'La contraseña es incorrecta.'});
                    }
                });
            }else{
              
                res.status(200).send({data:undefined,message:'Ya no tienes acceso al panel.'});
            }
        }else{
            res.status(200).send({data:undefined,message:'El correo electrónico no existe.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const registro_user_admin = async function(req,res){
    if(req.user){
        
        let data = req.body;
        console.log(data);
        try {

            var users = await User.find({email:data.email});
            bcrypt.hash('123456',null,null, async function(err,hash){
                if(err){
                    res.status(200).send({data:undefined,message:'No se pudo generar la contraseña.'});
                }else{
                    if(users.length >= 1){
                        res.status(200).send({data:undefined,message:'El correo electrónico ya existe.'});
                    }else{
                        data.fullnames = data.nombres + ' ' + data.apellidos;
                        data.password = hash;
                        let user = await User.create(data);
                        res.status(200).send({data:user});
                    }
                }
            });
            
        } catch (error) {
            res.status(200).send({data:undefined,message:'Verifique los campos del formulario.'});
        }
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const listar_users_admin = async function(req,res){
    if(req.user){
        let users = await User.find();
        res.status(200).send({data:users});
    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const cambiar_estado_user_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if(data.estado){
            nuevo_estado = false;
        }else if(!data.estado){
            nuevo_estado = true;
        }

        let user = await User.findByIdAndUpdate({_id:id},{
            estado: nuevo_estado
        });

        res.status(200).send({data:user});

    }else{
        res.status(403).send({data:undefined,message:'NoToken'});
    }
}

const obtener_user_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        try {
            let user = await User.findById({_id:id});
            if(user == undefined){
                res.status(200).send({data:undefined});
            }else{
                res.status(200).send(user);
            }
        } catch (error) {
            res.status(200).send(undefined);
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
    
}

const actualizar_admin_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let id = req.params['id'];

        try {
          
            let admin = await Admin.find({email: data.email});
            if(admin.length >= 1){

                if(admin[0]._id != id){
                    res.status(200).send({message:'El correo electrónico ya esta en uso',data:undefined});
                }else{
                    data.fullnames = data.nombres + ' ' + data.apellidos;
                    let reg = await Admin.findByIdAndUpdate({_id:id},{
                        nombres: data.nombres,
                        apellidos: data.apellidos,
                        fullnames: data.fullnames,
                        email: data.email,
                        telefono: data.telefono,
                        dni: data.dni,
                        rol: data.rol,
                        estado: data.estado,
                        f_nacimiento: data.f_nacimiento
                    });
                    res.status(200).send({data:reg}); 
                }
            }else{
                let reg = await Admin.findByIdAndUpdate({_id:id},{
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    fullnames: data.fullnames,
                    email: data.email,
                    telefono: data.telefono,
                    dni: data.dni,
                    rol: data.rol,
                    estado: data.estado,
                    f_nacimiento: data.f_nacimiento
                });
                res.status(200).send({data:reg});
                
            }
        } catch (error) {
            console.log(error);
            res.status(200).send({message:'Ocurrio un error en el servidor',data:undefined});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
    
}

module.exports = {
    login_admin,
    registro_user_admin,
    listar_users_admin,
    cambiar_estado_user_admin,
    obtener_user_admin,
    actualizar_admin_admin
}
