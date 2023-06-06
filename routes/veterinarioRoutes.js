import { Router } from "express";
import { confirmar, perfil, registrar } from "../controllers/veterinarioController.js";

const router = Router()

// Rutas
router.post('/', registrar )
router.get('/perfil', perfil )
router.get('/confirmar/:token', confirmar)






export default router