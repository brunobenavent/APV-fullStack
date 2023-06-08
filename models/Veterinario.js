import { Schema, model } from 'mongoose';
import generarId from '../helpers/generarId.js';
import bcrypt from 'bcrypt'

const VeterinarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
})

VeterinarioSchema.pre("save", async function(next){
    if(!this.isModified('password')) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

VeterinarioSchema.methods.comprobarPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

VeterinarioSchema.methods.toJSON = function(){
    const {__v, password, _id, token, ...veterinario} = this.toObject();
    veterinario.uid = _id

    return veterinario
}


const Veterinario = model('Veterinario', VeterinarioSchema)
 export default Veterinario