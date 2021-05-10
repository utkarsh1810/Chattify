import { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from './../InfoBar/InfoBar'
import Input from './../Input/Input'
import Messages from './../Messages/Messages';


// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://chattify-reactjs.herokuapp.com/';



let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState(' ');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, () => {
    });
     
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  },[messages]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, ()=> setMessage(''));
    }
  }

  console.log(message, messages);
  
 
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />      
      </div>
      <TextContainer users={users}/>
    </div>

  );
}

export default Chat;
