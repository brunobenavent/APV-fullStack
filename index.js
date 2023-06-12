import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express()
 
//conectar con la base de datos
await conectarDB()
const dominiosPermitidos = [process.env.FRONTEND_URL]

// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1 ){
            callback(null, true)
        }else{
            callback(new Error ('No permitido por CORS'))
        }
    }
}
// Middlewares
// Habilitar el parseo de las respuestas de tipo JSON
app.use(express.json())
app.use(cors(corsOptions))


// Routing
app.use('/api/veterinarios', veterinarioRoutes )
app.use('/api/pacientes', pacienteRoutes )


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})