import songModel from "../models/songModel.js";  // Update the model name
import fs from 'fs';
const addSong = async (req, res) => {
    const file = req.files['file']?.[0]; // Extract the file from the request
    const image = req.files['image']?.[0]; // Extract the image from the request

    if (!file || !image) {
        return res.status(400).json({ success: false, message: "Both audio file and image are required" });
    }

    const file_filename = file.filename;   // Audio file path
    const image_filename = image.filename; // Image file path

    const song = new songModel({
        name: req.body.name,
        description: req.body.description,
        file: file_filename,       // Save the file path in the DB
        listeners: 0,              // Initial listeners count
        image: image_filename      // Save the image file path in the DB
    });

    try {
        await song.save();
        res.json({ success: true, message: "Song and image added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving song" });
    }
};



const listSong = async (req, res) => {
    try {
        const songs = await songModel.find({});
        const baseUrl = `${req.protocol}://${req.get('host')}/songs/`; // Base URL for images
        const updatedSongs = songs.map(song => ({
            ...song.toObject(),
            image: `${baseUrl}${song.image}` // Prepend the base URL to the image filename
        }));
        res.json({ success: true, data: updatedSongs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching songs" });
    }
};


const removeSong = async (req, res) => {
    try {
        const song = await songModel.findById(req.body.id);
        if (!song) {
            return res.status(404).json({ success: false, message: "Song not found" });
        }

        fs.unlink(`uploads/${song.file}`, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song Removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing song" });
    }
};

export { addSong, listSong, removeSong };
