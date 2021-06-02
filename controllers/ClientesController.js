const Cliente = require('../database/models/Cliente')
const bcryptjs = require('bcryptjs')

exports.get = (req, res) => {
    Cliente.findAll().then(response => {
        console.log(response)
        res.render('clientes/index', { clientes: response })
    })

}

exports.new = (req, res) => {
    res.render('clientes/create', { cliente: {} })
}
exports.create = async(req, res) => {
    Cliente.create(req.body).then(response => {
        res.redirect('/clientes')
    }).catch(err => {
        res.render('clientes/create', {
            alert: {
                alert: true,
                alertTitle: "Cliente",
                alertMessage: err.errors[0].message,
                alertIcon: 'error',
                time: 1500,
                ruta: ''
            },
            cliente: req.body
        })
    })
}
exports.edit = (req, res) => {
    Cliente.findByPk(req.params.id).then(response => {
        res.render('clientes/create', { cliente: response })
    })
}

exports.update = async(req, res) => {
    Cliente.update(req.body, {
            where: { id: req.body.id }

        }).then(response => {
            res.redirect('/clientes')
        })
        .catch(err => {
            res.render('clientes/create', {
                alert: {
                    alert: true,
                    alertTitle: "Cliente",
                    alertMessage: err.errors[0].message,
                    alertIcon: 'error',
                    time: 1500,
                    ruta: ''
                },
                cliente: req.body
            })
        })
}
exports.delete = (req, res) => {
    Cliente.destroy({ where: { id: req.params.id } }).then(response => {
        res.redirect('/users/clientes')
    })
}