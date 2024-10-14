import express from "express";
import { addSong, listSong, removeSong } from "../controllers/songController.js";
import multer from 'multer';

const songRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use backticks
    },
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Allow only mp3 for audio and png/jpg/jpeg for images
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
    { name: 'file', maxCount: 1 },  // For the audio file
    { name: 'image', maxCount: 1 }  // For the image file
]), addSong);

songRouter.get("/list", listSong);  // Add the route for listing songs
songRouter.post("/remove", removeSong);

export default songRouter;
