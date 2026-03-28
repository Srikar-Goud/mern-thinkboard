import mongoose from "mongoose";

//1.create schema
const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true      
    },
    content: {
        type: String,   
        required: true
    },
},
{
    timestamps: true
});

//2.create model
const Note = mongoose.model("Note", noteSchema);

export default Note;
