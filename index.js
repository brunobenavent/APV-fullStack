import express from 'express'
import 'dotenv/config'
import conectarDB from './config/db.js'
const app = express()
 
//conectar con la base de datos
await conectarDB()



// Middlewares


// Routes
// app.use('/', )


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})