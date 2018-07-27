import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './frontend/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const multerUploads = multer({ storage }).single('imageUpload');

export default multerUploads;
