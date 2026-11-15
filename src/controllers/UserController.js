import User from "../models/User";

class UserController {
  async store(req, res) {

    try {
      const novoUser = await User.create(req.body);
      const {id, nome, email} = novoUser;
      return res.json({id, nome, email});

    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message)
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await User.findAll({attributes: ['id', 'nome', 'email']});
      if (!users) {
        return res.status(400).json({
          errors: ['Nem um usuário encontrado!']
        })
      }

      return res.json(users)

    } catch (error) {
      return res.status(400).json({
        errors: error.errors?.map(err => err.message) || [error.message]
      });
    }
  }

  async show(req, res) {
    try {
      const { idu } = req.params;
      const user = await User.findByPk(idu);

      const {id, nome, email} = user;

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário Não Existe!']
        })
      }

      return res.json({id, nome, email})

    } catch (error) {
      return res.status(400).json({
        errors: error.errors?.map(err => err.message) || [error.message]
      });
    }
  }

  async update(req, res) {
    try {
      // const { id } = req.userId;

      // if(!id) {
      //   return res.status(400).json({
      //     errors: ['ID Não encontrado!']
      //   });
      // }

      const users = await User.findByPk(req.userId);

      if(!users) {
        return res.status(400).json({
          errors: ['ID Não encontrado!']
        });
      }

      const novoDados = await users.update(req.body);
      const {id, nome, email} = novoDados;

      return res.json({id, nome, email})

    } catch (error) {
      return res.status(400).json({
        errors: error.errors?.map(err => err.message) || [error.message]
      });
    }
  }

  async delete(req, res) {
    try {
      // const { id } = req.params;

      // if(!id) {
      //   return res.status(400).json({
      //     errors: ['ID Não encontrado!']
      //   });
      // }

      const users = await User.findByPk(req.userId);

      if(!users) {
        return res.status(400).json({
          errors: ['ID Não encontrado!']
        });
      }

      await users.destroy();

      return res.json(users)
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message)
      });
    }
  }
}

export default new UserController();
