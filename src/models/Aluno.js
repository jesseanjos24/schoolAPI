import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
    static init(sequelize) {
        super.init({
            nome: {
              type: Sequelize.STRING,
              defaultValue: '',
              validate: {
                len: {
                  args: [3, 255],
                  msg: 'Nome precisa ter entre 3 e 255 caracteries',
                }
              }
            },
            sobrenome: {
              type: Sequelize.STRING,
              defaultValue: '',
              validate: {
                len: {
                  args: [3, 255],
                  msg: 'Sobrenome precisa ter entre 3 e 255 caracteries',
                }
              }
            },
            email: {
              type: Sequelize.STRING,
              defaultValue: '',
              unique: {
                msg: 'E-mail já registrado!'
              },
              validate: {
                isEmail: {
                  msg: 'Email invalido'
                },
              }
            },
            idade: {
              type: Sequelize.INTEGER,
              defaultValue: null,
              validate: {
                isInt: {
                  msg: 'Idade invalida, precisa ser interiro'
                }
              }
            },
            peso: {
              type: Sequelize.FLOAT,
              defaultValue: null,
              validate: {
                isFloat: {
                  msg: 'peso invalida'
                }
              }
            },
            altura: {
              type: Sequelize.FLOAT,
              defaultValue: null,
              validate: {
                isFloat: {
                  msg: 'altura invalida'
                }
              }
            },
        }, {
            sequelize,
            tableName: 'alunos',
        });
        return this;
    }

    static associate(models) {
      this.hasMany(models.Fotos, {foreignKey: 'aluno_id'})
    }
}
