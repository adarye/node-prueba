const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Model = Sequelize.Model;

class Cliente extends Model {}
Cliente.init({
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
            }
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
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            notNull: {
                msg: "La Dirección es requerida"
            },
            notEmpty: {
                msg: "El Dirección es requerida"
            }
        }
    },
    user_id: DataTypes.BIGINT
}, { sequelize, modelName: 'cliente' });

Cliente.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Cliente;