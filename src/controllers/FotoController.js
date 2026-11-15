// import Aluno from "../models/Aluno";
import multer from "multer";
import multerConfig from "../config/multerConfig";

import Fotos from "../models/Fotos";


const uploads = multer(multerConfig).single('foto');

class FotoController {
  async store(req, res) {
    return uploads(req, res, async (err)=>{
      if(err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const {originalname, filename} = req.file;
        const {aluno_id} = req.body;
        const foto = await Fotos.create({originalname, filename, aluno_id})

        const {id, url} = foto;

        return res.json({id, url, originalname, filename, aluno_id});
      } catch (error) {
        return res.status(400).json({
          errors: error.errors
            ? error.errors.map((e) => e.message)
            : [error.message],
        });
      }

    })
  }
}

export default new FotoController();
