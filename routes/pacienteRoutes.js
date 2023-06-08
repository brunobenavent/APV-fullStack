import { Router} from 'express'
import { agregarPaciente, obtenerPacientes } from '../controllers/pacienteController.js';

const router = Router()

router.route('/')
    .post(agregarPaciente)
    .get(obtenerPacientes)

export default router;