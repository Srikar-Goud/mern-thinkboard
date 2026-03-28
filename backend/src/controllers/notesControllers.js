import Note from '../models/Note.js';
export async function getAllNotes(req,res) {
 try{
    const notes = (await Note.find());
    res.status(200).json(notes);
 }
 catch(error){
    res.status(500).json({message: 'Error retrieving notes', error: error.message})
 }
};

export async function getNotesById(req,res){
    try{
        const note = await Note.findById(req.params.id);    
        if(!note){
            return res.status(404).json({message: 'Note not found!'});
        }
        res.status(200).json(note);
    }
    catch(error){
        console.error('Error retrieving note', error);
        res.status(500).json({message: 'Error retrieving note', error: error.message});
    }
};


export async function createNotes(req,res){
    try{
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content
        });
        await newNote.save();
        res.status(201).json({message: 'Note created successfully!', note: newNote});
    }
    catch(error){
        res.status(500).json({message: 'Error creating note', error: error.message});
    }
}
export async function updateNotes(req,res){
    try{
        const{title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new: true});
        if(!updatedNote){
            return res.status(404).json({message: 'Note not found!'});
        }
    }
    catch(error){
        console.error('Error updating note', error);
        res.status(500).json({message: 'Error updating note', error: error.message});
    }
};
export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: 'Note not found!'});
        }
        res.status(200).json({message: 'Note deleted successfully!', note: deletedNote});
    }
    catch(error){
        console.error('Error deleting note', error);
        res.status(500).json({message: 'Error deleting note', error: error.message});
    }
}; 