
import express from 'express'
import router from './routes.js'


const app = express()

// indicar para o express ler body com json
app.use(express.json())

// usar o router
app.use(router)

export default app
