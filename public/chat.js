const socket = io();

const checkValues = () => {
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  console.log(email, firstName, lastName, age, alias, avatar);
  return (
    email !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    age !== "" &&
    alias !== "" &&
    avatar !== ""
  );
};

const enableIfAllFieldsAreFilled = (htmlId) => {
  document.getElementById(htmlId).onchange = (e) => {
    const send = document.getElementById("send");
    if (checkValues()) {
      send.disabled = false;
    } else {
      send.disabled = true;
    }
  };
};

["email", "firstName", "lastName", "age", "alias", "avatar"].forEach((id) =>
  enableIfAllFieldsAreFilled(id)
);

document.getElementById("message-form").onsubmit = (e) => {
  e.preventDefault();
  const inputField = document.getElementById("message");
  const message = inputField.value;
  const tiempo = new Date();
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  socket.emit("newMessage", {
    author: {
      id: email,
      firstName,
      lastName,
      age,
      alias,
      avatar,
    },
    text: message,
    timestamp: tiempo.toLocaleString(),
  });
  inputField.value = "";
};

// Sockets operations

const renderChatBlock = (data) => {
  const chatBlock = document.createElement("div");
  chatBlock.innerHTML = `
      <p><strong style='color: blue'>${data.author.id}</strong> <span style='color: brown'>${data.timestamp}</span>: <span>${data.text}</span></p>`;
  document.getElementById("messages").appendChild(chatBlock);
};

const author = new normalizr.schema.Entity("author");
const message = new normalizr.schema.Entity("message", { author: author });
const listOfMessages = new normalizr.schema.Entity("messages", {
  messages: [message],
});

const updateCompressionPercentage = (normalized, denormalized) => {
  const normalizedSize = JSON.stringify(normalized).length;
  const denormalizedSize = JSON.stringify(denormalized).length;
  const percentege = Math.round((normalizedSize / denormalizedSize) * 100);

  document.getElementById("percentege").innerHTML = `${percentege} %`;
};

const renderChats = (messages) => {
  const denormalizedMessages = normalizr.denormalize(
    messages.result,
    listOfMessages,
    messages.entities
  );
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  updateCompressionPercentage(messages, denormalizedMessages);

  denormalizedMessages.messages.forEach((m) => renderChatBlock(m));
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

socket.on("connected", ({ products, messages, template }) => {
  renderChats(messages);
});

socket.on("messageRecieved", (data) => {
  renderChats(data);
});
