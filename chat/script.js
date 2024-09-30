// Global variables
let userName = '';
let userColor = '';
const audio = new Audio('notif.mp3');

// DOM elements
const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.getElementById('messages'),
  input: document.getElementById('message-input'),
  form: document.querySelector('.message-form'),
  lightModeBtn: document.getElementById('light-mode-btn'),
  darkModeBtn: document.getElementById('dark-mode-btn'),
  nameColorModal: document.getElementById('nameColorModal'),
  nameColorForm: document.getElementById('nameColorForm'),
  usernameInput: document.getElementById('username'),
  userColorInput: document.getElementById('usercolor'),
};

// Show modal on page load
window.addEventListener('load', () => {
  DOM.nameColorModal.style.display = 'flex';
});

// Handle form submission to set user name and color
DOM.nameColorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userName = DOM.usernameInput.value;
  userColor = DOM.userColorInput.value;

  // Hide modal
  DOM.nameColorModal.style.display = 'none';

  // Connect to Scaledrone after setting name and color
  connectToScaledrone();
});

// Connect to Scaledrone
function connectToScaledrone() {
  const CLIENT_ID = 'vfafhYS31psXR9NZ'; // Replace with your own client ID
  const drone = new ScaleDrone(CLIENT_ID, {
    data: {
      name: userName,
      color: userColor
    }
  });

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe('observable-room');
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log('Successfully joined room');
    });

    room.on('members', members => {
      updateMembersDOM(members);
    });

    room.on('member_join', member => {
      addMemberToDOM(member);
    });

    room.on('member_leave', ({ id }) => {
      removeMemberFromDOM(id);
    });

    room.on('data', (text, member) => {
      if (member) {
        addMessageToDOM(text, member);
      }
    });
  });

  drone.on('close', event => {
    console.log('Connection was closed', event);
  });

  drone.on('error', error => {
    console.error(error);
  });

  // Store the drone instance in a global variable for sending messages
  window.drone = drone;
}

// Send message to the room
DOM.form.addEventListener('submit', sendMessage);

function sendMessage(e) {
  e.preventDefault();
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  window.drone.publish({
    room: 'observable-room',
    message: value
  });
}

// Update members DOM
function updateMembersDOM(members) {
  DOM.membersCount.innerText = `${members.length} users in the room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(addMemberToDOM);
}

function addMemberToDOM(member) {
  const memberElement = document.createElement('div');
  memberElement.className = 'member';
  memberElement.innerText = member.clientData.name;
  memberElement.style.color = member.clientData.color;
  DOM.membersList.appendChild(memberElement);
}

function removeMemberFromDOM(id) {
  const members = Array.from(DOM.membersList.children);
  members.forEach(member => {
    if (member.dataset.id === id) {
      DOM.membersList.removeChild(member);
    }
  });
}

// Add message to DOM
function addMessageToDOM(text, member) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `
    <div class="member" style="color: ${member.clientData.color}">
      ${member.clientData.name}
    </div>
    <div>${text}</div>
  `;
  DOM.messages.appendChild(messageElement);
  DOM.messages.scrollTop = DOM.messages.scrollHeight;
  audio.play();
}

// Theme toggling with CSS variables
DOM.lightModeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
});

DOM.darkModeBtn.addEventListener('click', () => {
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
});