const User = require('../database/models/User');
const bcryptjs = require('bcryptjs')



exports.get = (req, res) => {
    req.session.destroy();
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
            res.locals.user = user.nombre;
            if (user.rol === 'vendedor') {
                res.redirect('/clientes')
            } else {

                res.redirect('/')
            }

        } else {
            console.log('Usuario y/o password incorerectas');
            res.render('auth/login', {
                layout: 'layout2',
                alert: true,
                alertTitle: "Login",
                alertMessage: 'Usuario y/o password incorerectas',
                alertIcon: 'error',
                time: 1500,
                ruta: 'login'
            })

        }
    } else {
        console.log('Este usuario no esta registrado');
        res.render('auth/login', {
            layout: 'layout2',
            alert: true,
            alertTitle: "Login",
            alertMessage: 'Este usuario no esta registrado',
            alertIcon: 'error',
            time: 2000,
            ruta: 'login'

        }, )

    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login')

}
exports.error401 = (req, res) => {
    res.render('shared/401.ejs', { layout: 'layout2', rol: req.session.rol })
}
exports.error404 = (req, res) => {
    res.render('shared/404.ejs', { layout: 'layout2', rol: req.session.rol })

}