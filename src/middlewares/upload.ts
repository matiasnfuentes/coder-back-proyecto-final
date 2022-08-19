import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const { email } = req.body;
    const ext = file.originalname.split(".").pop();
    cb(null, email + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
