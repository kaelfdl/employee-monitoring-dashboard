import React, { useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';

function EmployeeTable({client}) {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        client.get('/employees/')
        .then(response => {
            setMessage(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    {/* <th>Username</th> */}
                    </tr>
                </thead>
                <tbody>
                    {message.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                            </tr>
                        )
                    })}
                 </tbody>
            </Table>
        </div>
    );
}

export default EmployeeTable;