const fs = require('fs');
const chalk = require('chalk');



const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
    
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    })
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('note added');
    }
    else{
        console.log('note aready taken');
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    })
    if(notes.length !== notesToKeep.length){
        console.log(chalk.green.inverse('note removed successfully'));
    }
    else{
        console.log(chalk.red.inverse('note not removed '));
    }

    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log("Your notes...");
    notes.forEach(note => {
        console.log(note.title+':'+note.body);        
    });
}
const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if(findNote)
    {
        console.log(findNote.title + ': ' + findNote.body);
    }
    else{
        console.log(chalk.red.inverse('Note not found'));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};