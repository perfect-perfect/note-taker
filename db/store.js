const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFileASync = util.promisify(fs.readFile);

const writeFileASync = util.promisify(fs.writeFile);

class Store {
    getDB(){
        return readFileASync('db/db.json','utf-8')
    }
    writeNote(note){
        return writeFileASync('db/db.json', JSON.stringify(note))
    }
    getNotes(){
        return this.getDB().then((notes)=>{
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes))
            } catch(err){
                console.log(err)
                parsedNotes = []
            }
            return parsedNotes;
        })
    }
    addNote(note){
        const {title,text} = note;
        if(!title || !text){
            throw new Error('Note did not contain characters. fillot title and test to create note')
        }
        const newNote = {title, text, id:uuidv4()}
        return this.getNotes()
        .then((notes)=>[ ...notes, newNote ])
        .then((updatedDB)=> this.writeNote(updatedDB))
        .then(()=>newNote);
    }
    removeNote(id){
        return this.getNotes()
        .then((notes)=> notes.filter((note)=>note.id!== id))
        .then((filterNotes)=>this.writeNote(filterNotes))

    }
}
module.exports = new Store();