const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index')
const Model = Sequelize.Model;
const bcrypt = require('bcryptjs')


class User extends Model {}
User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El ID es requerido"
            },
            len: {
                args: [6, 128],
                msg: "Este Documento no es valido"
            },
            isInt: {
                msg: "El Documento de Identidad debe ser un numero"
            }

        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El Email es requerido"
            },
            isEmail: {
                msg: 'El email tiene que ser un email valido'
            },

        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            notNull: {
                msg: "El Nombre es requerido"
            },
            notEmpty: {
                msg: "El Nombre es requerido"
            }
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            notNull: {
                msg: "El Rol es requerido"
            },
            notEmpty: {
                msg: "El Nombre es requerido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,

    },
}, {
    sequelize,
    modelName: 'usuario',
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        },

    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }


});





module.exports = User;