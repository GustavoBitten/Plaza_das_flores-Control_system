const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // Destino do arquivo
  destination: function (req, file, cb) {
    cb(null, path.join("public", "images", "pets"));
  },
  // Nome do arquivo
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const uploadPet = multer({ storage: storage });


module.exports = uploadPet;
