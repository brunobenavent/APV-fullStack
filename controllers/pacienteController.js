import Paciente from "../models/Paciente.js"
import Veterinario from "../models/Veterinario.js"


const agregarPaciente = async( req, res ) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)
    } catch (error) {
        error = new Error('Hubo un error al registra el paciente')
        return res.status(400).json({msg: error.message})
    }
}

const obtenerPacientes = async( req, res ) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
    res.json(pacientes)
}

const obtenerPaciente = async( req, res ) => {
    const {id} = req.params
    
    const paciente = await Paciente.findById(id)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(400).json({msg: error.message})
    }
    
    // comprobar que el paciente pertenece al veterinario
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error ('Acción no permitida')
        return res.status(401).json({msg: error.message})
    }
    
    res.json(paciente)
}

const actualizarPaciente = async( req, res ) => {
    const {id} = req.params
    
    const paciente = await Paciente.findById(id)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(400).json({msg: error.message})
    }
    
    // comprobar que el paciente pertenece al veterinario
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error ('Acción no permitida')
        return res.status(401).json({msg: error.message})
    }

    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
        
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente = async( req, res ) => {
    const {id} = req.params
    
    const paciente = await Paciente.findById(id)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(400).json({msg: error.message})
    }
    
    // comprobar que el paciente pertenece al veterinario
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error ('Acción no permitida')
        return res.status(401).json({msg: error.message})
    }

    try {
        await paciente.deleteOne()
        res.json({msg:"Paciente eliminado correctamente"})
        
    } catch (error) {
        console.log(error)
    }
}
export{
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}