import { Router } from 'express'
import path from 'path'
import fs from 'fs'

const download = Router()

download.get('/download', (req, res) => {
  const filePath = path.resolve('./uploads/remove.png') // Ruta del archivo procesado

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'El archivo no existe.' })
  }

  const backupPath = path.resolve('./uploads/backup_remove.png')
  try {
    fs.copyFileSync(filePath, backupPath)

    // Descargar el archivo
    res.download(filePath, 'remove.png', (err) => {
      if (err) {
        // Restaurar el archivo original en caso de error
        fs.copyFileSync(backupPath, filePath)
        fs.unlinkSync(backupPath)
        return res.status(500).json({ error: 'Error al descargar el archivo.' })
      }

      // Eliminar el archivo de respaldo después de una descarga exitosa
      try {
        fs.unlinkSync(backupPath)
      } catch (error) {
        console.log("Error al eliminar el archivo de respaldo:", error)
      }
    })
  } catch (error) {
    console.log("Error al procesar el archivo:", error)
    return res.status(500).json({ error: "Error al procesar la imagen" })
  }
})

export default download
