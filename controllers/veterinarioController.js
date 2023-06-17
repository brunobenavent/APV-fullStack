import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import emailRegistro from "../helpers/emailRegistro.js"
import Veterinario from "../models/Veterinario.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"

const registrar = async(req, res) =>{
    const {email, nombre} = req.body
    try {
        const usuario = await Veterinario.findOne({email})
        if(usuario){
            const error = new Error('El usuario ya está registrado')
            return res.status(400).json({msg: error.message})
        }

        const veterinario  = new Veterinario( req.body)
        const veterinarioGuardado = await veterinario.save()

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)        
    }
    
}
const perfil = (req, res) =>{
    const {veterinario} = req
    res.json(veterinario)
}

const actualizarPerfil = async(req, res) =>{
    const {id} = req.params

    const {nombre, email, telefono, web} = req.body
    const veterinario = await Veterinario.findById(id)
    if(!veterinario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    if(veterinario.email !== email){ // En esta linea quiere decir si lo estás intentando modificar
        const existeEmail = await Veterinario.findOne({email})
        if(existeEmail){
            const error = new Error ('Este email ya está en uso')
            return res.status(400).json({
                msg: error.message
            })
        }
    }
    try {

        veterinario.nombre = nombre
        veterinario.email = email
        veterinario.telefono = telefono
        veterinario.web = web

        const veterinarioActualizado = await veterinario.save()
        res.json(veterinarioActualizado)
    } catch (error) {
        console.log(error)
    }


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
const autenticar = async( req, res ) => {
    const {email, password} = req.body
    // Comprobamos que el usuario existe
    const veterinario = await Veterinario.findOne({email})
    if(!veterinario){
        const error = new Error('No se ha encontrado nigún usuario con este email, intenta de nuevo o regístrate si aún no lo hiciste')
        return res.status(403).json({msg: error.message})
    }
    // Comprobamos que el usuario está confirmado
    if(!veterinario.confirmado){
        const error = new Error('No has confirmado tu cuenta aún')
        return res.status(403).json({msg: error.message})
    }

    // Comprobamos que la contraseña es correcta
    if(!await veterinario.comprobarPassword(password)){
        const error = new Error('Hubo un error al comprobar tu contraseña, intentelo de nuevo más tarde')
        return res.status(403).json({msg: error.message})
       
    }
    veterinario.token = generarJWT(veterinario._id)
    res.json(veterinario)  
}
const olvidePassword = async( req, res ) => {
    const {email} = req.body;
    //comprobamos que el usuario existe
    const veterinario = await Veterinario.findOne({email})
    if(!veterinario){
        const error = new Error('Usuario no encontrado')
        return res.status(403).json({msg: error.message})
    }
    try {
        veterinario.token = generarId()
        await veterinario.save()
        //Enviar email con las instrucciones para reestablecer el password
        emailOlvidePassword({
            nombre: veterinario.nombre,
            email,
            token: veterinario.token })

        res.json({
            msg: 'Hemos enviado un email con las instrucciones para resetear el password'
        })
    } catch (error) {
        console.log(error.message)
    }
}

const comprobarToken = async( req, res ) => {
    const { token } = req.params
    //Comprobamos que el token es válido
    const veterinario = await Veterinario.findOne({token})
    if(!veterinario){
        const error = new Error('El token no es válido')
        return res.status(401).json({msg: error.message})
    }
    res.json({
        msg: 'token confirmado'
    })
}

const nuevoPassword = async( req, res ) => {
    const { token } = req.params
    const { password } = req.body

    //Comprobamos que el token es válido
    const veterinario = await Veterinario.findOne({token})
    if(!veterinario){
        const error = new Error('El token no es válido')
        return res.status(401).json({msg: error.message})
    }
        try {

            veterinario.password = password
            veterinario.token = null
            veterinario.confirmado = true
            const veterinarioGuardado = await veterinario.save()

            res.json({
                msg: 'El password ha sido modificado correctamente'
            })
            
        } catch (error) {
            console.log(error.message)
        }

}
const actualizarPassword = async (req, res) => {
    // Leemos los datos
    const {id} = req.veterinario
    const {pwd_actual, pwd_nuevo} = req.body

    //Comprobar que el veterinario existe
    const veterinario = await Veterinario.findById(id)
    if(!veterinario){
        const error = new Error('El token no es válido')
        return res.status(401).json({msg: error.message})
    }
    // Comprobar su password
    if( await veterinario.comprobarPassword(pwd_actual)){
        // Almacenar nuevo Password
        veterinario.password = pwd_nuevo
        await veterinario.save()
        res.json({msg: "Password modificado correctamente"})
    }else{
        const error = new Error('El password introducido es incorrecto')
        return res.status(401).json({msg: error.message})
    }
}



export {
    registrar,
    perfil,
    actualizarPerfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPassword
}