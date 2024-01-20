import React from 'react';
import { useState, useEffect } from 'react';
import { Alert, FloatingLabel, InputGroup, Container, Navbar, Form, Button} from 'react-bootstrap';



function LoginPage({client, currentUser, setCurrentUser, sendMessage, currentUsername, setCurrentUsername}) {
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    client.get("/user/")
    .then((res) => {
      setCurrentUser(true);
    })
    .catch((res) => {
      console.log(res)
      setCurrentUser(false);
    }, [])
  })

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    }
    else {
      document.getElementById("form_btn").innerHTML = "Login";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/register/",
      {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password2: password2
      }
    )
    .then((res) => {

      sendMessage('login')
      setCurrentUser(true);
      setCurrentUsername(res.data['username']);
    })
    .catch((error) => {
      console.log(error)
      setErrorMessage(error)
    })

  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login/",
      {
        username: username,
        password: password
      }
    )
    .then((res) => {
      console.log(res.data)
      sendMessage('login')
      setCurrentUser(true);
      setCurrentUsername(res.data['username']);
    })
    .catch((error) => {
      console.log(error)
      setErrorMessage(error)
    })
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/"
    )
    .then((res) => {
      setCurrentUser(false);
      sendMessage('logout')
    })
  }


  if (currentUser)
  {
    return (
      <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Employee Monitoring Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text>
            <form onSubmit={e => submitLogout(e)}>
              <Button type="submit" variant="light">Logout</Button>
            </form>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='center'>
      <h2>Hello {currentUsername}!</h2>
    </div>
      </div>
    );
  } 

  return (

<div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Employee Monitoring Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"className='justify-content-end' >
          <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {
      registrationToggle ? (
        <div className='center'>
          <Form onSubmit={e => submitRegistration(e)}>
        <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
              <Form.Control required type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </FloatingLabel>
        <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
              <Form.Control required type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </FloatingLabel>
        <FloatingLabel controlId="floatingInputFirstName" label="First Name" className="mb-3">
              <Form.Control required type="text" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </FloatingLabel>
        <FloatingLabel controlId="floatingInputLastName" label="Last Name" className="mb-3">
              <Form.Control required type="text" placeholder="Enter email" value={lastName} onChange={e => setLastName(e.target.value)} />
      </FloatingLabel>
        <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
              <Form.Control required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </FloatingLabel>
        <FloatingLabel controlId="floatingInputRe-TypePassword" label="Re-type Password" className="mb-3">
              <Form.Control required type="password" placeholder="Re-type Password" value={password2} onChange={e => setPassword2(e.target.value)} />
      </FloatingLabel>

          {errorMessage ? <Alert key='danger' variant='danger'>Please fill the required fields</Alert> : null}
             <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    </div>
      ) : (
        <div className='center'>
          <Form onSubmit={e => submitLogin(e)}>
        <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
              <Form.Control required type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </FloatingLabel>

        <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
              <Form.Control required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </FloatingLabel>

          {errorMessage ? <Alert key='danger' variant='danger'>Username or password is invalid</Alert> : null}
             <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    }
</div>
  );
}

export default LoginPage;
