import Veterinario from "../models/Veterinario.js"

const registrar = async(req, res) =>{
    const {email} = req.body
    try {
        const usuario = await Veterinario.findOne({email})
        if(usuario){
            const error = new Error('El usuario ya está registrado')
            return res.status(400).json({msg: error.message})
        }

        const veterinario  = new Veterinario( req.body)
        const veterinarioGuardado = await veterinario.save()
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)        
    }
    
}
const perfil = (req, res) =>{
    res.json({
        msg: 'mostrando perfil'
    })
}

export {
    registrar,
    perfil
}