import React, { useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 

function EmployeeTable({client, currentUser, createEmployeeToggle, setCreateEmployeeToggle, serverMessage}) {
    const [employeeData, setEmployeeData] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [sortColumn, setSortColumn] = useState(""); 
    const [sortOrder, setSortOrder] = useState("asc"); 
    const [sortMsg, setSortMsg] = useState(""); 


    useEffect(() => {
        client.get('/employees/')
        .then(response => {
            setEmployeeData(response.data);
            setTabData(response.data)
        })
        .catch(error => {
            console.log(error);
            setEmployeeData([]);
            setTabData([])
        });
    }, [serverMessage]);

 function handleResetSort() {
    setTabData(employeeData)
    setSortColumn("")
 }
 
    function sortFunction(f) { 
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
        
        let sorted = []
        if (f === 'id') {

        sorted = [...employeeData].sort((a, b) => { 
            return sortOrder === "asc" ? ((a.id > b.id) ? 1 : -1) : ((a.id > b.id) ? -1 : 1)
        }); 
        setSortColumn('id')
        }
        else if (f === 'username') {

        sorted = [...employeeData].sort((a, b) => { 
            return sortOrder === "asc" ? ((a.username > b.username) ? 1 : -1) : ((a.username > b.username) ? -1 : 1)
        }); 
        setSortColumn('username')
        }
        else if(f === 'firstName') {
        sorted = [...employeeData].sort((a, b) => { 
            return sortOrder === "asc" ? ((a.first_name > b.first_name) ? 1 : -1) : ((a.first_name > b.first_name) ? -1 : 1)
        }); 
        setSortColumn('firstName')
        }
        else if(f === 'lastName') {
        sorted = [...employeeData].sort((a, b) => { 
            return sortOrder === "asc" ? ((a.last_name > b.last_name) ? 1 : -1) : ((a.last_name > b.last_name) ? -1 : 1)
        }); 
        setSortColumn('lastName')
        }
        else if(f === 'status') {
        sorted = [...employeeData].sort((a, b) => { 
            return sortOrder === "asc" ? ((a.is_online > b.is_online) ? 1 : -1) : ((a.is_online > b.is_online) ? -1 : 1)
        }); 
        setSortColumn('status')
        }
        setTabData(sorted); 
    }; 

    return (
        <div>
            <Button onClick={handleResetSort}>Reset sort</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th onClick={() => sortFunction("id")}> 
                            ID{" "} 
                            {sortColumn === "id" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("username")}> 
                            Username{" "} 
                            {sortColumn === "username" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("firstName")}> 
                            First Name{" "} 
                            {sortColumn === "firstName" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("lastName")}> 
                            Last Name{" "} 
                            {sortColumn === "lastName" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("status")}> 
                            status{" "} 
                            {sortColumn === "status" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    
                    </tr>
                </thead>
                <tbody>
                    {tabData.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.username}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td className={data.is_online ? 'table-success' : 'table-danger'}>{data.is_online ? "Online" : "Offline"}</td>
                            </tr>
                        )
                    })}
                 </tbody>
            </Table>
         </div>
    );
}

export default EmployeeTable;