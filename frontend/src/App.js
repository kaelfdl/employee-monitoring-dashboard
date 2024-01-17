import './App.css';
import axios from 'axios';
import LoginPage from './components/LoginPage';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  return (
    <LoginPage client={client}/>
  )
}

export default App;
