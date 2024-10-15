import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },  
    listenr: { type: Number, default: 0 },
    image: { type: String, required: true }, 
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
