const User = require('../database/models/User');
const bcryptjs = require('bcryptjs')



exports.get = (req, res) => {
    res.render('auth/login', { layout: 'layout2' })

}
exports.login = async(req, res) => {
    var password = req.body.password;
    const user = await User.findOne({
        where: {
            email: req.body.email,
            rol: req.body.rol
        }
    })
    if (user) {
        if (bcryptjs.compareSync(password, user.password)) {
            req.session.user = user.nombre;
            req.session.rol = user.rol;
            console.log(req.session);
            res.render('auth/login', {
                alert: true,
                alertTitle: "Login",
                alertMessage: 'Usuario y password corerectas',
                alertIcon: 'success',
                time: 1500,
                ruta: ''
            })
        } else {
            res.render('auth/login', {
                alert: true,
                alertTitle: "Login",
                alertMessage: 'Usuario y/o password incorerectas',
                alertIcon: 'error',
                time: 1500,
                ruta: ''
            })

        }
    } else {
        res.render('auth/login', {
            alert: true,
            alertTitle: "Login",
            alertMessage: 'Este usuario no esta registrado',
            alertIcon: 'error',
            time: 2000,
            ruta: 'login'
        })

    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login')

}