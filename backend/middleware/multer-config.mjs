import multer from 'multer';
import path from 'path';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'video/mp4': 'mp4',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationPath = path.join(__dirname, '..', 'assets');
    callback(null, destinationPath);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

export default multer({ storage: storage }).single('files');

