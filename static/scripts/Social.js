let socket = io();

socket.on('connect', () => {
  let name = prompt('Hello', '');
  if(!name) {
    name = 'YHS';
  }
  socket.emit('newUser', name);
})

socket.on('update', (data) => {
  let chat = document.querySelector('#chat');
  let message = document.createElement('div');
  let node = document.createTextNode(`${data.name} : ${data.message}`);
  let className = ``;

  switch(data.type) {
    case 'message' :
      className = `other`;
      break;
    case 'connect' :
      className = `connect`;
      break;
    case 'disconnect' :
      className = `disconnect`;
      break;
  }
  message.classList.add(className);
  message.appendChild(node);
  chat.append(message);
})

function send() {
  let message = document.querySelector('#test').value;
  document.querySelector('#test').value = '';

  let chat = document.querySelector('#chat');
  let msg = document.createElement('div');
  let node = document.createTextNode(message);

  msg.classList.add('me');
  msg.appendChild(node);
  chat.appendChild(msg);

  socket.emit('message', {type: 'message', message: message});
}