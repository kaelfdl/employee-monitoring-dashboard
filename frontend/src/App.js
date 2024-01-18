import './App.css';
import { useState } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import EmployeeTable from './components/EmployeeTable';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <div className='App'>
    <LoginPage client={client} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    <EmployeeTable client={client} currentUser={currentUser}/>
    </div>
  )
}

export default App;
