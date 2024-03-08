import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import "../App.css";

const socket = io('http://localhost:8000');

const App = () => {
  const [chats, setChats] = useState([]);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-chat');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!sender || !receiver || !message) return;

    try {
      const response = await axios.post('http://localhost:8000/send-chat', {
        sender,
        receiver,
        message,
      });

      setChats([...chats, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error sending the message:', error);
    }
  };

  useEffect(() => {
  fetchChats();

    socket.on('message', (newChat) => {
      setChats([...chats, newChat]);
    });
  }, [chats]);

  return (
    <div className='mainclass'>
      <h2>Chat App</h2>
      <div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div>
        <h2>Conversation :</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <strong>From: {chat.sender}</strong> | To: {chat.receiver} | {' '} {chat.message}
            </li>
          ))}
        </ul>
        </div>
    </div>
  );
};

export default App;
