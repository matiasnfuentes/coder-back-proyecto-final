const socket = io();

document.getElementById("message-form").onsubmit = (e) => {
  e.preventDefault();
  const inputField = document.getElementById("message");
  const timestamp = new Date();
  const message = {
    email,
    text: inputField.value,
    timestamp: timestamp.getTime(),
    type: "USER",
  };

  if (isPublicChat) {
    socket.emit("newMessage", { ...message, private: false });
  } else {
    socket.emit("newPrivateMessage", { ...message, private: true });
  }

  inputField.value = "";
};

// Sockets operations

const renderChatBlock = (data) => {
  const chatBlock = document.createElement("div");
  const time = new Date(Number(data.timestamp));

  chatBlock.innerHTML = `
      <p><strong style='color: blue'>${
        data.email
      }</strong> <span style='color: brown'>${time.toLocaleString()}</span>: <span>${
    data.text
  }</span></p>`;
  document.getElementById("messages").appendChild(chatBlock);
};

const renderChats = (messages) => {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  messages.forEach((m) => renderChatBlock(m));
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

socket.on("messageRecieved", (data) => {
  renderChats(data);
});

if (isPublicChat) {
  socket.emit("generalChatInitialized");
} else {
  socket.emit("privateChatInitialized", { email: email });
}
