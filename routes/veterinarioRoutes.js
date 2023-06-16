import { Router } from "express";
import { actualizarPerfil, autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router()

// Rutas públicas
router.post('/', registrar )
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)


// Rutas protegidas
router.get('/perfil', checkAuth, perfil )
router.put('/perfil/:id', checkAuth, actualizarPerfil )


export default router