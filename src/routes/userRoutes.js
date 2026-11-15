import { Router } from "express";
import UserControler from '../controllers/UserController'
import lgNss from "../middlewares/loginRequired";

const router = new Router();

// não se aplica - NÃO DEVERIA EXISTIR
// router.get('/', lgNss, UserControler.index);
// router.get('/:id',lgNss, UserControler.show);

// não se aplica - NÃO DEVERIA EXISTIR

// SE APLICA
router.post('/', lgNss, UserControler.store);
router.put('/', lgNss,  UserControler.update);
router.delete('/', lgNss,  UserControler.delete);

export default router
