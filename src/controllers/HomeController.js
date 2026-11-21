import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    res.json('Seja Bem Vindo a API [ESCOLA]');
  }
}

export default new HomeController();
