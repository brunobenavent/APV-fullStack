import { Schema, model } from "mongoose";

const pacienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: Date,
        required: true
    },
    sintomas: {
        type: String,
        required: true
    },
    veterinario: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinario',
        required: true
    },
}, {
    timestamps: true
})


const Paciente = model('Paciente', pacienteSchema)
export default Paciente