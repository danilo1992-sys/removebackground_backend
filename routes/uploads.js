import { removeBackground } from '@imgly/background-removal-node'
import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

const router = Router()

const upload = multer({ dest: 'uploads/' })

//* Subida de imágenes
router.post('/img', upload.single('imgbackground'), (req, res) => {
  const file = req.file
  save(file)

  res.send('File uploaded!')

  function save (file) {
    const name = file.originalname
    const newpath = `./uploads/${name}`
    fs.renameSync(file.path, newpath)
    remove(name)
    return newpath
  }

  async function blobbuffer (blob) {
    const arrayBuffer = await blob.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
  //* Removiendo el fondo
  function remove (name) {
    const input = `./uploads/${name}`
    const uotput = './uploads/remove.png'
    if (!fs.existsSync(input)) {
      console.error(`The file ${name} does not exist`)
      process.exit(1)
    }
    const inputpath = path.resolve(input)
    const imgroute = `file://${inputpath}`

    removeBackground(imgroute)
      .then(async blob => {
        const buffer = await blobbuffer(blob)
        fs.writeFileSync(uotput, buffer)
      })
      .catch(err => {
        console.error(err)
      })
  }
})

export default router
