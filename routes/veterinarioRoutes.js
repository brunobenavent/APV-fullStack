import { Router } from "express";
import { perfil, registrar } from "../controllers/veterinarioController.js";

const router = Router()

// Rutas
router.post('/', registrar )
router.get('/perfil', perfil )






export default router