import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },   // song file path
    listenr: { type: Number, default: 0 }, // corrected default
    image: { type: String, required: true }, // image path
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
