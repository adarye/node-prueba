const User = require('../database/models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



exports.get = (req, res) => {

    User.findAll().then(response => {
        res.render('users/index', { users: response, rol: req.params.rol })

    })

}
exports.search = (req, res) => {

    User.findAll({
        where: {
            nombre: {
                [Op.like]: `%${req.query.param}%`
            }
        }
    }).then(response => {
        res.render('users/index', { users: response, rol: req.params.rol })
    })


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