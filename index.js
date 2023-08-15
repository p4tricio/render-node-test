import express from "express"
import {config} from 'dotenv'
import pg from 'pg'

config()

const app = express();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl : true // Se ha comantado, puesto que 
  //este atributo solo se usa al conectar una bd 
  // de render a un sistema en local.
  // Una vez desplegada no es necesario.
})

app.get('/', (req, res) => {
  res.send("Te amo Berni <3 ")
});

app.get('/ping', async (req,res) => {
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0])
})

app.listen(3000)
console.log("Server on port", 3000)
