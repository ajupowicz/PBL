﻿document.addEventListener('DOMContentLoaded', function () {
    const notepad = document.getElementById('notepad');
    const saveNotesButton = document.getElementById('saveNotesButton');
    const saveStatus = document.getElementById('saveStatus');

    displayNotes();

    saveNotesButton.addEventListener('click', function () {
        const note = notepad.value.trim();
        if (note) {
            const notes = getNotes();
            notes.push(note);
            saveNotes(notes)
        
            saveStatus.textContent = 'Notes saved!';
            setTimeout(() => { saveStatus.textContent = ''; }, 2000);

            notepad.value = "";
            displayNotes();
            console.log(notes);
        }
    });
});


function getNotes() {
    const notes = localStorage.getItem('notepadContent')
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('notepadContent', JSON.stringify(notes));
}

function displayNotes() {
    const notes = getNotes();
    const notesList = document.getElementById('notes-list');

    notesList.innerHTML = '';
    notes.forEach(note => {
        notesList.innerHTML += `<li>${note}</li>`;
    })
}