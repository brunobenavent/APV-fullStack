import express from 'express'
import 'dotenv/config'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express()
 
//conectar con la base de datos
await conectarDB()



// Middlewares
// Habilitar el parseo de las respuestas de tipo JSON
app.use(express.json())
// Routing
app.use('/api/veterinarios', veterinarioRoutes )
app.use('/api/pacientes', pacienteRoutes )


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})