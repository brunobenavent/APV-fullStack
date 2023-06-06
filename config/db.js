import mongoose from 'mongoose'

const conectarDB = async() =>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `Database: ${db.connection.name.toUpperCase()}\nHost: ${db.connection.host}\nPort: ${db.connection.port}\n`
        console.log(`\nMONGODB\n${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
        
    }
}

export default conectarDB