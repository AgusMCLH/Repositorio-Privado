const socket = io();

const email = document.getElementById('user-email').innerText;
document.getElementById('user-email').remove();
console.log(email);

let messageForm = document.getElementById('message-form');

messageForm.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let messageFormData = messageForm.value;
    if (messageFormData.trim().length > 0) {
      console.log('ejecuta');
      socket.emit('NewMessage', {
        message: messageFormData,
        user: email,
      });
      messageForm.value = '';
    }
  }
});

socket.on('ShowMessages', (messages) => {
  renderMessages(messages);
});

const renderMessages = (messages) => {
  let html = messages
    .map((message) => {
      return `<div>
      <p>${message.user}: ${message.message}</p>
      </div>`;
    })
    .join(' ');
  document.getElementById('chat-history').innerHTML = html;
};
