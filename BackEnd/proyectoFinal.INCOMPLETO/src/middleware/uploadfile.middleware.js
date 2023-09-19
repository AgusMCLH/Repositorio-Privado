import multer from 'multer';

// uploadFile(/assets/images, 'jpg', '132132bg2js3', 'user', 'avatar')
export const uploadFiles = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, req.session.user._id + '-' + file.originalname);
    },
  });

  return multer({ storage });
};
