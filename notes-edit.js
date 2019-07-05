// 1. Add a DOM element between the title and body inputs (empty span)
// 2. Set text value: Last edited 4 hours ago
// 3. Update value on title/body/storage change

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElemnent = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (note === undefined) { // <-- does not seem to kick user if 'id' is invalid
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElemnent.textContent = generateLastEditMsg(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElemnent.textContent = generateLastEditMsg(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElemnent.textContent = generateLastEditMsg(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => { // <--- Renders latest data across all tabs
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)
        
        if (note === undefined) { // <-- does not seem to kick user if 'id' is invalid - FIX
            location.assign('/index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
        dateElemnent.textContent = generateLastEditMsg(note.updatedAt)
    }
})





