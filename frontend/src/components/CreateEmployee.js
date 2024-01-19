import { useState } from 'react';
import { Form, Button, InputGroup} from 'react-bootstrap';

function CreateEmployee({client, setCreateEmployeeToggle}) {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

    function submitCreateEmployee(e) {
        e.preventDefault();
        console.log(client)
        client.post('/employees/', 
        {
            first_name: firstName,
            last_name: lastName,
        })
        .then((res) => console.log('ok'))
        .catch((error) => console.log(error))
    }
    function handleCancelAddEmployee(){
        setCreateEmployeeToggle(false);
    }
    return (
        <div>
        {/* <div className='center'> */}
 
          <Form onSubmit={e => submitCreateEmployee(e)}>
            {/* <Form.Group className="mb-3" controlId="formBasicFirstName"> */}
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
              {/* <Form.Label>First Name</Form.Label> */}
              First Name
        </InputGroup.Text>
              <Form.Control type="text" placeholder="Enter first name" aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </InputGroup>
            {/* </Form.Group> */}
        <InputGroup className="mb-3">
            {/* <Form.Group className="mb-3" controlId="formBasicLastName"> */}
              {/* <Form.Label>Last Name</Form.Label> */}
        <InputGroup.Text id="inputGroup-sizing-default">
        Last Name
        </InputGroup.Text>
              <Form.Control type="text" placeholder="Enter last name" aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={lastName} onChange={e => setLastName(e.target.value)} />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            {/* </Form.Group> */}
      </InputGroup>
             <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={handleCancelAddEmployee}>Cancel</Button>
          </Form>
    </div>

    );
}

export default CreateEmployee;
