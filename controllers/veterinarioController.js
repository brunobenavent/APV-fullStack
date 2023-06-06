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

const confirmar = async( req, res ) => {
    const {token} = req.params
    try {
        const usuario = await Veterinario.findOne({token})

        // comprobar que el usuario existe
        if(!usuario){
            const error = new Error('Token no válido')
            return res.status(404).json({msg: error.message})
        }
        usuario.token = null
        usuario.confirmado = true
        await usuario.save()
        res.json({
            msg: "Usuario Confirmado correctamente",
        })
        
    } catch (error) {
        console.log(error)  
    }
}

export {
    registrar,
    perfil,
    confirmar
}