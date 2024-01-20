import './App.css';
import { useState } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import EmployeeTable from './components/EmployeeTable';
import CreateEmployee from './components/CreateEmployee';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true

// Axios configuration for requests
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// Websocket
const appSocket = new WebSocket('ws://' + '127.0.0.1:8000' + '/ws/socket-server/');

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [currentUsername, setCurrentUsername] = useState('');
  const [createEmployeeToggle, setCreateEmployeeToggle] = useState(false);
  const [serverMessage, setServerMessage] = useState('');


  appSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      const message = data['message'];
      console.log(message);
      setServerMessage(message);
  };

  appSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
  };

  // Send message to server
  function sendMessage(message) {
      appSocket.send(JSON.stringify({
          'message': message
      }));
  }

  return (
    <div className='App'>
    <LoginPage client={client} currentUser={currentUser} setCurrentUser={setCurrentUser} sendMessage={sendMessage} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername}/>
    {currentUser ? <EmployeeTable client={client} currentUser={currentUser} createEmployeeToggle={createEmployeeToggle} setCreateEmployeeToggle={setCreateEmployeeToggle} serverMessage={serverMessage}/> : null}
    {
      createEmployeeToggle ?  <CreateEmployee client={client} setCreateEmployeeToggle={setCreateEmployeeToggle}/> : null
    }
    </div>
  )
}

export default App;
