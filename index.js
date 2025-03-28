import cors from 'cors'
import express from 'express'
import router from './routes/uploads.js'
process.loadEnvFile()

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
