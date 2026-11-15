import { Router } from "express";

import fotoControler from '../controllers/FotoController'
import lgNss from "../middlewares/loginRequired";

const router = new Router();

router.post('/', lgNss , fotoControler.store)


export default router
