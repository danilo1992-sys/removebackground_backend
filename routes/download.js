import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const download = Router();

download.get('/download', (req, res) => {
  const filePath = path.resolve('./uploads/remove.png'); // Ruta del archivo procesado

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'El archivo no existe.' });
  }

  // Descargar el archivo
  res.download(filePath, 'remove.png', (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al descargar el archivo.' });
    }
  });
});

export default download;
