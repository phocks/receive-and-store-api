// server.js
const express = require("express");
const multer = require("multer");
const dayjs = require("dayjs");
const path = require("path");
const cors = require('cors')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = dayjs().format("YYYY-MM-DD-HH-mm-ss");
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), uploadFiles);

function uploadFiles(req, res) {
  res.json({ message: "Successfully uploaded files" });
}

app.listen(5000, () => {
  console.log(`Server started. POST to: http://localhost:5000/upload`);
});
