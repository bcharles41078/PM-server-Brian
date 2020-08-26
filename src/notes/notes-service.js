const xss = require('xss')

const NotesService = {
  // getAllNotes(db, detail_id) {
  //   return db
  //     .from('project_details')
  //     .select('*','due_date')
  //     .where('detail_id', detail_id);
  //   },

 

  // deleteNoteById(db, note_id){
  //   return db
  //     .from('project_notes')
  //     .where('note_id', note_id)
  //     .del();
  // },

  // updateNote(db, note_id, updatedNote){
  //   return db 
  //     .from('project_notes')
  //     .update({
  //       note_id: note_id,
  //       note: updatedNote.note
  //     })
  //     .where('note_id', note_id)
  // },

  // insertNote(db, newnote) {
  //   return db
  //     .insert(newnote)
  //     .into('project_notes')
  //     .returning('*')
  //     .then(([note]) => note)
  // },

  // serializeProjects(note) {
  //   const { author } = note
  //   return {
  //     note_id: note.detail_id,
  //     note: xss(note.project_title)
  //   }
  // },
}

module.exports = NotesService
