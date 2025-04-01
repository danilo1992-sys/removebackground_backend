import cors from 'cors'
import express from 'express'
import router from './routes/uploads.js'
import download from './routes/download.js'
process.loadEnvFile()

const app = express()

const port = 3000

app.use(cors())
app.use(router)
app.use(download)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
