import React, { useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';

function EmployeeTable({client, currentUser, createEmployeeToggle, setCreateEmployeeToggle}) {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        client.get('/employees/')
        .then(response => {
            setEmployeeData(response.data);
        })
        .catch(error => {
            console.log(error);
            setEmployeeData([]);
        });
    }, [currentUser]);

    function handleAddEmployee(){
        createEmployeeToggle ? setCreateEmployeeToggle(false) : setCreateEmployeeToggle(true)
    }

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
                    {employeeData.map((data) => {
                        return (
                            <tr>
                                <td key={data.id}>{data.id}</td>
                                <td key={data.first_name}>{data.first_name}</td>
                                <td key={data.last_name}>{data.last_name}</td>
                            </tr>
                        )
                    })}
                 </tbody>
            </Table>
            {
                !createEmployeeToggle ? <Button variant="success" onClick={handleAddEmployee}>Add</Button> : null
            }
        </div>
    );
}

export default EmployeeTable;