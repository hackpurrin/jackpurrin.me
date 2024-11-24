function createNote() {
    const stickyNotes = document.querySelector('.sticky-notes');
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
  
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    noteContent.contentEditable = true;
    noteContent.textContent = 'New note';
  
    const noteActions = document.createElement('div');
    noteActions.classList.add('note-actions');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-note');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      noteContainer.remove();
    };
  
    noteActions.appendChild(deleteButton);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(noteActions);
    stickyNotes.appendChild(noteContainer);
  }
  
  function deleteNote(button) {
    const noteContainer = button.closest('.note-container');
    noteContainer.remove();
  }