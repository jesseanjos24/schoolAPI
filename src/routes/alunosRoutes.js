import { Router } from "express";
import AlunoController from "../controllers/AlunoController";
import lgNss from "../middlewares/loginRequired";


const router = new Router();

router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);
router.post('/', lgNss, AlunoController.store);
router.put('/:id', lgNss, AlunoController.update);
router.delete('/:id', lgNss, AlunoController.delete);


export default router
