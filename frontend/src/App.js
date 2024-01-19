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

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <div className='App'>
    <LoginPage client={client} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    <CreateEmployee client={client}/>
    <EmployeeTable client={client} currentUser={currentUser}/>
    </div>
  )
}

export default App;
