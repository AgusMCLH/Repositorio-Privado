const socket = io();

const email = document.getElementById('user-data').innerText.split('###')[0];
const UserName = document.getElementById('user-data').innerText.split('###')[1];
document.getElementById('user-data').remove();
console.log(email);

let messageForm = document.getElementById('message-form');

messageForm.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let messageFormData = messageForm.value;
    if (messageFormData.trim().length > 0) {
      console.log('ejecuta');
      socket.emit('NewMessage', {
        message: messageFormData,
        user: UserName,
        email,
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
      let messageType = 'rcvd';
      console.log('|' + message.email + '|' + email + '|');
      if (message.email === email) {
        messageType = 'sent';
      }
      console.log(messageType);
      return `
      <div data-time="${message.user} 16:40" class="msg ${messageType}">${message.message}</div>`;
    })
    .join(' ');
  document.getElementById('chat-history').innerHTML = html;
};
