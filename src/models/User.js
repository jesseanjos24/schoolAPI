import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
              type: Sequelize.STRING,
              defaultValue: '',
              validate: {
                len: {
                  args: [3, 255],
                  msg: 'Insira um nome com no minimo 3, e no maximo 255 caracteries'
                }
              }
            },
            email: {
              type: Sequelize.STRING,
              defaultValue: '',
              unique: {
                msg: 'Email já existe'
              },
              validate: {
                isEmail: {
                  msg: 'Digite um email valido'
                }
              }
            },
            password_hash: {
              type: Sequelize.STRING,
              defaultValue: '',
            },
            password: {
              type: Sequelize.VIRTUAL,
              defaultValue: '',
              validate: {
                len: {
                  args: [6, 50],
                  msg: 'A Senha precisa ter mais que 6 caracteries'
                }
              }
            },
        }, {
            sequelize,
            tableName: 'users',
        });

        this.addHook('beforeSave', async user => {
          if(user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        })
        return this;
    }

    passwordIsValid(password) {
      return bcrypt.compare(password, this.password_hash);
    }
}
