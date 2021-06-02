const User = require('../database/models/User');



exports.get = (req, res) => {
    if (req.params.rol) {
        User.findAll({
            where: {
                rol: req.params.rol
            }
        }).then(response => {
            res.render('users/index', { users: response, rol: req.params.rol })
        })
    } else {
        User.findAll().then(response => {
            res.render('users/index', { users: response, rol: req.params.rol })
        })
    }

}
exports.edit = (req, res) => {
    User.findByPk(req.params.id).then(response => {
        res.render('users/create', { user: response })
    })
}
exports.update = (req, res) => {
    User.update(req.body, {
        where: { id: req.body.id }
    }).then(response => {
        res.redirect('/')
    }).catch(err => {
        res.render('users/create', {
            alert: {
                alert: true,
                alertTitle: "Usuario",
                alertMessage: err.errors[0].message,
                alertIcon: 'error',
                time: 1500,
                ruta: ''
            },
            user: req.body
        })
    })
}
exports.new = (req, res) => {

    res.render('users/create', { user: [] })
}

exports.create = (req, res) => {

    User.create(req.body).then(response => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
        res.render('users/create', {
            alert: {
                alert: true,
                alertTitle: "Usuario",
                alertMessage: err.errors[0].message,
                alertIcon: 'error',
                time: 1500,
                ruta: ''
            },
            user: req.body
        })
    })

}
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(response => {
        res.redirect('/')
    })
}