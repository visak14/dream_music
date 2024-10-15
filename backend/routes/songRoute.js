import express from "express";
import { addSong, listSong, removeSong } from "../controllers/songController.js";
import multer from 'multer';

const songRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      
        if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || 
            file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || 
            file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only MP3, PNG, JPG, and JPEG are allowed.'), false);
        }
    },
});


songRouter.post("/add", upload.fields([
    { name: 'file', maxCount: 1 },  
    { name: 'image', maxCount: 1 } 
]), addSong);

songRouter.get("/list", listSong);  
songRouter.post("/remove", removeSong);

export default songRouter;
