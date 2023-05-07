import multer from 'multer';

const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb('./public/img/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const imgUploader = multer({ storage: imgStorage });

export { imgUploader };
