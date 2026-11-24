import { json } from "sequelize";
import Aluno from "../models/Aluno";
import Fotos from "../models/Fotos";
// import js from "@eslint/js";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Fotos, 'id', 'DESC']],
      include: {
        model: Fotos,
        attributes: ['id', 'url', 'filename']
      },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: 'Id Não encontado'
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Fotos, 'id', 'DESC']],
        include: {
          model: Fotos,
          attributes: ['id', 'url', 'filename']
        },
      });
      if(!aluno) {
        return res.status(400).json({
          errors: 'Aluno Não encontado'
        })
      }

      // const {idi, nome, email} = aluno;
      return res.json(aluno)
    } catch (error) {
      return res.status(400).json({
          errors: error.errors ?
          error.errors.map((err)=> err.message)
          : [error.message],
        })
    }
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno)
    } catch (error) {
      return res.status(400).json({
          errors: error.errors ?
          error.errors.map((err)=> err.message)
          : [error.message],
        })
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: 'Id Não encontado'
        })
      }

      const aluno = await Aluno.findByPk(id);
      if(!aluno) {
        return res.status(400).json({
          errors: 'Aluno Não encontado'
        })
      }

      // const {idi, nome, email} = aluno;
      const alunoAtualizado = await aluno.update(req.body);
      return res.json(alunoAtualizado);

    } catch (error) {
      return res.status(400).json({
          errors: error.errors ?
          error.errors.map((err)=> err.message)
          : [error.message],
        })
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params;
      if(!id) {
        return res.status(400).json({
          errors: 'Id Não encontado'
        })
      }

      const aluno = await Aluno.findByPk(id);
      if(!aluno) {
        return res.status(400).json({
          errors: 'Aluno Não encontado'
        })
      }

      // const {idi, nome, email} = aluno;
      await aluno.destroy();
      return res.json({
        apagado: 'Aluno apagado!'
      })

    } catch (error) {
      return res.status(400).json({
          errors: error.errors ?
          error.errors.map((err)=> err.message)
          : [error.message],
        })
    }
  }
}

export default new AlunoController();
